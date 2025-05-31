import { useParams } from "react-router-dom"
import { useState , useEffect} from 'react';
import '../styles/bookdet.css'
import axios from 'axios'
import s from '../assets/synop.png'

function Bookdet(){

    const {title} = useParams();
    const [data,setdata] = useState({})

    const fetchAPI = async ()=>{
        const res = await axios.get(`http://localhost:8080/bookdetails/${title}`)
        console.log(res.data.bdet)
        setdata(res.data.bdet)
    }

    useEffect(()=>{
        fetchAPI()
    },[])

    const saved = "https://cdn2.iconfinder.com/data/icons/web-ecommerce-and-shopping-3/64/Web_Ecommerce-80-128.png"
    const unsaved = "https://cdn4.iconfinder.com/data/icons/e-commerce-572/24/E-commerce_expanded-50-128.png"

    const [savedstatus,setsavedstatus] = useState(unsaved);

    function togglebtwpics(e){
        e.stopPropagation();
        console.log(savedstatus===unsaved?'saved':'unsaved')
        setsavedstatus(savedstatus===unsaved?saved:unsaved)
    }

    return(
        <>
        <div className="uppercontainer">
        <div className="imgcontainer">
            <img src={data.image} alt="" />
        </div>
        <div className="sidedata">
        <p className="author">{data.author_name}</p>
        <p className="title">{data.title}</p>
        <p className="rating">{`⭐${data.rating} (${data.noofreaders} ratings)`}</p>
        <ul>
        <p className="genresboard">Genres</p>
        {data.genres?.map((item,index)=>(
            <li key={index} className="genre">{item}</li>
        ))}
        </ul>
        <div className="wishlist">
            <img className='save-icon' onClick={togglebtwpics} src={savedstatus} alt="" />
            <button className="wishlistbutton" onClick={togglebtwpics} >Add to wishlist</button>
        </div>
        </div>
        </div>
        <div className="lowercontainer">
            <div className="syadnimg">
            <img src="https://cdn-icons-png.flaticon.com/128/684/684831.png" alt="" />
            <p>Synopsis</p>
            </div>
            <p>{data.longSynopsis}</p>
        </div>
        </>
    )
}
export default Bookdet