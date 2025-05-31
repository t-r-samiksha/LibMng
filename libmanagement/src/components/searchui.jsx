import { useState , useEffect } from "react"
import '../styles/searchui.css'
import axios from 'axios'
import Vbook from "./vbook"
import { useLocation } from "react-router-dom" 

function Searchui(){

    const loc = useLocation();
    const queryparams = new URLSearchParams(loc.search);
    let title = queryparams.get("title")

    const [books,setbooks] = useState([])

    const [value,setvalue] = useState(1)
    const [genres,setgenres] = useState([queryparams.get("genres")])
    const [author,setauthor] = useState(queryparams.get("author")?queryparams.get("author"):'')
    const [genrelist,setgenrelist] = useState([])
    const [authors,setauthors] = useState([])

    useEffect(() => {
        if (title) {
            const titlebooks = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/booksearch/search?title=${title}`);
                    console.log(res.data);
                    setbooks(res.data);
                } catch (err) {
                    console.error("Failed to fetch by title:", err);
                }
            };
            titlebooks();
        }
        else{
            const titlebooks = async () => {
            try {
                const res = await axios.get("http://localhost:8080/booksearch/search?ratingabove=1&author=&genres=");
                console.log(res.data);
                setbooks(res.data);
            } catch (err) {
                console.error("Failed to fetch by title:", err);
            }}
            titlebooks();
        }
    }, [title]);


    const fetchAPI = async ()=>{
        const res = await axios.get('http://localhost:8080/booksearch/setup')
        console.log(res.data)

        setauthors(res.data.authors)
        setgenrelist(res.data.genres)
    }

    useEffect(()=>{
        fetchAPI()
    },[])

    const fetchdata = async ()=>{
        const finalg = genres?genres.join(','):''
        const res = await axios.get(`http://localhost:8080/booksearch/search?ratingabove=${value}&author=${author}&genres=${finalg}`)
        console.log(res.data)
        setbooks(res.data)
    }

    useEffect(()=>{
        fetchdata()
        console.log(value,author,genres)
    },[value,author,genres])

    function handlonchange(e){
        setauthor(e.target.value)
    }

    function handlecheckbox(genre){
        if(genres.includes(genre)){
            setgenres(genres.filter((g)=>g!==genre))
        }else{
            setgenres([...genres,genre])
        }
    }

    function clearbutton(){
        setvalue(1);
        setgenres([]);
        setauthor('');
    }

    return(
        <>
        <div className="full">
            <div className="half1">
                <div className="filter">
                    <img src="https://cdn-icons-png.flaticon.com/128/7693/7693332.png" alt="" />

                    <div className="filtertop">
                    <p className="filterlabel">FILTERS</p>
                    <p className="clearbutton" onClick={clearbutton}>CLEAR</p>
                    </div>


                    <p className="sidetitle">Author</p>
                    <select className="dropdown" value={author} onChange={handlonchange}>
                        <option value="">All Authors</option>
                        {authors && authors.map((a,i)=>(
                            <option value={a} key={i}>{a}</option>
                        ))}
                    </select>


                    <p className="sidetitle">Rating</p>
                    <input type="range" className="rating" min={1} max={5} step={1} value={value} onChange={(e)=>setvalue(e.target.value)} />
                    <p className="ratingvalue">{value}+</p>

                    <p className="sidetitle">Genres</p>
                    {genrelist && genrelist.map((gitem,index)=>(
                        <label key={index}>
                        <input type="checkbox" checked={genres.includes(gitem)} onChange={()=>handlecheckbox(gitem)} />
                            {gitem}
                        </label>
                    ))}
                    
                </div>
            </div>
            
            <div className="half2">
                    {
                        books.map((b,index)=>(
                                <Vbook author={b.author_name} title={b.title} image={ b.image} key={index} />
                        ))  
                    }
            </div>
        </div>
        </>
    )
}
export default Searchui