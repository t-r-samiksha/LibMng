import { createContext , useState , useEffect} from "react";
import axios from 'axios'

const UserContext = createContext()

function UserProvider({children}){

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        //console.log("user updated localstprage",user.wishlist)
        if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        } else {
        localStorage.removeItem('user');
        }
    }, [user]);

    // useEffect(()=>{
    //     console.log('user',user)
    // },[user])

    useEffect(() => {
    const fetchUser = async () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            try {
                const res = await axios.get(`http://localhost:8080/user/${parsedUser.name}`);
                setUser(res.data);
            } catch (error) {
                console.error('Failed to fetch user from backend:', error);
            }
        }
    };
    fetchUser();
}, []);

    const addToWishlist = async (book) => {
        //console.log('entered addtowishlist func');
        try {
            const res = await axios.post('http://localhost:8080/addtowishlist', {
                booktitle: book,
                username: user.name,
            });

            setUser((prev) => {
                //console.log('entered setuser func');
                const updatedWishlist = [...prev.wishlist, book];
                //console.log('Updated wishlist add:', updatedWishlist);
                return {
                    ...prev,
                    wishlist: updatedWishlist,
                };
            });
        } catch (error) {
            console.error('Failed to add book to wishlist:');
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            } else {
                console.error(error.message);
            }
        }
    };

    const removeFromWishlist = async (book)=>{
        //console.log('entered removeFromWishlist func');
        try{

        const res = await axios.delete(`http://localhost:8080/removefromwishlist` , {data : {booktitle: book, username: user.name}})
        console.log(res.data)

        setUser((prev)=>{ 
            const updatedWishlist =  prev.wishlist.filter(t => t!== book)
            //console.log('Updated wishlist remove:', updatedWishlist);
            return {
            ...prev,
            wishlist: prev.wishlist.filter(b=>b !== book)
        }})
        }catch (error) {
            console.error('Failed to add book to wishlist:');
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            } else {
                console.error(error.message);
            }
        }
    }

    return(

        <UserContext.Provider value={{user,setUser,addToWishlist,removeFromWishlist}}>
            {children}
        </UserContext.Provider>
        
    )
}

export {UserContext,UserProvider}