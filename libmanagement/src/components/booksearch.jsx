import BookCarousel from './bookcarousel.jsx'
import { useEffect, useState } from 'react';
import '../styles/booksearch.css'
import Vbook from './vbook.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Booksearch(){

    const [authors,setauthors] = useState([])
    const [reclist,setreclist] = useState([])

    async function fetchAPI(){
        const res = await axios.get('http://localhost:8080/booksearch/authoroftheweek')
        console.log(res.data.a)
        setauthors(res.data.a)
    }

    useEffect(()=>{
        fetchAPI()
        boy()
    },[])

    const boy = async ()=>{
        const res = await axios.get('http://localhost:8080/booksearch/bookoftheweek')
        console.log(res.data)
        setreclist(res.data)
    }

    const nav = useNavigate()

    function mtp(c){
        nav(`/booksearch/search?genres=${c}`)//&genres=&ratingabove=1
    }

    function handleauthorclick(a){
        // nav('http://localhost:8080/booksearch/search?ratingabove=1&author=&genres=')
        nav(`/booksearch/search?author=${a}`)//&genres=&ratingabove=1
    }

    // const reclist = [
    //     {
    //         author: "Claire Fraise",
    //         title: "They Hunt",
    //         status: 1,
    //         image: "https://images-platform.99static.com//Q2Fwj5laXViAM8QtAGAfpxUyEYg=/fit-in/500x500/projects-files/152/15287/1528752/f86d06e9-f594-4207-99a3-ab29ac5bd86d.jpg",
    //     },
    //     {
    //         author: "Colleen Hoover",
    //         title: "It Ends with Us",
    //         status: 1,
    //         image: "https://m.media-amazon.com/images/I/91CqNElQaKL.jpg",
    //     },
    //     {
    //         author: "Alex Michaelides",
    //         title: "The Silent Patient",
    //         status: 0,
    //         image: "https://m.media-amazon.com/images/I/81JJPDNlxSL._AC_UF1000,1000_QL80_.jpg",
    //     },
    //     {
    //         author: "Taylor Jenkins Reid",
    //         title: "The Seven Husbands of Evelyn Hugo",
    //         status: 1,
    //         image: "https://m.media-amazon.com/images/I/71pIEVU3EeL.jpg",
    //     },
    //     {
    //         author: "Paulo Coelho",
    //         title: "The Alchemist",
    //         status: 0,
    //         image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    //     },
    //     {
    //         author: "George Orwell",
    //         title: "1984",
    //         status: 1,
    //         image: "https://m.media-amazon.com/images/I/715WdnBHqYL._UF1000,1000_QL80_.jpg",
    //     },
    //     {
    //         author: "Harper Lee",
    //         title: "To Kill a Mockingbird",
    //         status: 1,
    //         image: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg",
    //     },
    //     {
    //         author: "Mark Manson",
    //         title: "The Subtle Art of Not Giving a F*ck",
    //         status: 0,
    //         image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg",
    //     }
    // ];

    const popularGenres = [
    "Fiction",
    "Mystery",
    "Fantasy",
    "Romance",
    "Science Fiction",
    "Non-Fiction",
    "Biography"
    ];

    const popularGenresWithIconsAndColors = {
        Fiction: {
            icon: "https://cdn-icons-png.flaticon.com/128/3500/3500421.png",
            color: "#FADADD" // pastel pink
        },
        Mystery: {
            icon: "https://cdn-icons-png.flaticon.com/128/6688/6688579.png",
            color: "#D8B4FE" // pastel purple
        },
        Fantasy: {
            icon: "https://cdn-icons-png.flaticon.com/128/1680/1680365.png",
            color: "#C4F1F9" // pastel blue
        },
        Romance: {
            icon: "https://cdn-icons-png.flaticon.com/128/5540/5540505.png",
            color: "#FFE0E9" // light rose
        },
        "Science Fiction": {
            icon: "https://cdn-icons-png.flaticon.com/128/947/947670.png",
            color: "#D1FADF" // pastel green
        },
        "Non-Fiction": {
            icon: "https://cdn-icons-png.flaticon.com/128/14835/14835186.png",
            color: "#FFF5BA" // pastel yellow
        },
        Biography: {
            icon: "https://cdn-icons-png.flaticon.com/128/6776/6776510.png",
            color: "#FFD6A5" // pastel orange
        }
    };

    return(
        <>
        <BookCarousel />
        <p className="wishtitle">Find More Category</p>
        <div className="cbox">
        {popularGenres.map((g,index)=>(
            <div className='categorybook' style={{backgroundColor:popularGenresWithIconsAndColors[g].color}} key={index} onClick={()=>mtp(g)}>
                <img src={popularGenresWithIconsAndColors[g].icon} alt="" className='genreimg' />
            <p>{g}</p>
            </div>
        ))}
        </div>
        <div className="authorandbyear">
            <div className="a">
                <p className="wishtitle">Author of the week</p>
                <div className="authorslist">
                    <ul>
                    {authors.map((a,index)=>(
                        <li className='author-card' key={index} onClick={()=>handleauthorclick(a)} >{a}</li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className="separator-line"></div>
            <div className="bookoftheyear">
                <p className="wishtitle">Book of the year</p>
                <div className="bookbox">
                {reclist.map((item,index)=>(
                    <Vbook author={item.author_name} title={item.title} status={item.status} image={item.image} key={index} />
                ))}
                </div>
            </div>
        </div>
        <div className="endspace" style={{height:40}}></div>
        </>
    )
}
export default Booksearch