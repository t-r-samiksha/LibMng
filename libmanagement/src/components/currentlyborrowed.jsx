import Book from './book.jsx'
import '../styles/cbook.css'
import { useEffect , useState} from 'react';
import axios from 'axios'
import { UserContext } from '../context/usercontext.jsx';
import { useContext } from 'react';

function Currentlyborrowedbooks(){

    const {user} = useContext(UserContext)

    const [cbooklistjsx,setcbooklistjsx] = useState([])

    const fetchAPI = async ()=>{
        const res = await axios.get(`http://localhost:8080/currentlyborrowed?name=${user.name}`)
        console.log("form currently borrowed: ",user.name)
        setcbooklistjsx(res.data)
    }

    useEffect(()=>{
        fetchAPI()
    },[])

    cbooklistjsx.sort((a,b)=>a.deadline-b.deadline)

    return(
        <>
        <div className="cbookbox">
            <p className="boxtitlehome"><img src="https://cdn-icons-png.flaticon.com/128/5833/5833290.png" alt="" height={20} /> Currently Borrowed<span className="badge">{cbooklistjsx.length}</span>
</p>
            <div className="cbooklist">
            <ul>
            {cbooklistjsx.map((item,index)=>{return(
        <li key={index}>
        <Book author={item.author_name} title={item.title} image={item.image} deadline={item.deadline} />
        </li>)
    })}
            </ul>
        </div>
        </div>
        </>
    )
}
export default Currentlyborrowedbooks