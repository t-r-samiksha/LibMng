import '../styles/vbook.css';
import { useNavigate } from 'react-router-dom';
import { useState , useContext , useEffect} from 'react';
import { UserContext } from '../context/usercontext.jsx'

function Vbook(props){

    const { user , addToWishlist , removeFromWishlist } = useContext(UserContext);

    const saved = "https://cdn2.iconfinder.com/data/icons/web-ecommerce-and-shopping-3/64/Web_Ecommerce-80-128.png"
    const unsaved = "https://cdn4.iconfinder.com/data/icons/e-commerce-572/24/E-commerce_expanded-50-128.png"


    const nav = useNavigate();
    
    function mtbp(){
        nav(`/bookdetails/${props.title}`);
    }

    const [savedstatus, setsavedstatus] = useState(unsaved);

    useEffect(() => {
        //console.log("WISHLISTNOW",user.wishlist)
        if (user?.wishlist?.includes(props.title)) {
            setsavedstatus(saved);
        } else {
            setsavedstatus(unsaved);
        }
    },[user.wishlist]);

    // useEffect(() => {
    //     console.log("Wishlist updated:", user?.wishlist);
    // }, [user.wishlist]);
    
    function togglebtwpics(e){
        e.stopPropagation();
        const nextstatus = savedstatus===unsaved?saved:unsaved
        setsavedstatus(nextstatus)
        if(nextstatus===saved){
            //add to list
            addToWishlist(props.title)
        }else{
            //remove from list
            removeFromWishlist(props.title)
        }
        console.log(nextstatus===unsaved?'unsaved':'saved')
    }

    return(
        <>
        <div className="vbooklayout" onClick={mtbp} >
            <div className="vbook">
                <img src={props.image} alt="" className='bookimg' />
                <img src={savedstatus} alt="" className="save-icon" onClick={togglebtwpics} />
                <div className="titleandauthor">
                    <p className='vtitle'>{props.title}</p>
                    <p className='vauthor'>{props.author}</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default Vbook;