import 'react-calendar/dist/Calendar.css'; 
import React, { useState , useEffect } from 'react';
import CalendarComponent from './calandercomp.jsx'
import '../styles/borrowedbooks.css'
import Borrowcomp from './borrowcomp.jsx'
import Genre from './genre.jsx';
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from "../context/usercontext.jsx"

function Borrowedbooks(){

    const [date, setDate] = useState(new Date());
    const { user } = useContext(UserContext)
    const [books,setbooks] = useState([])
    const [borrowedDates,setborrowedDates] = useState([])
    const [g,setg] = useState([])

    const fetchAPI = async ()=>{
        try{
          if(user){
            // console.log('sending req')
          const res = await axios.get(`http://localhost:8080/myborrowedbooks?name=${user.name}`)
          console.log(res.data)
          setbooks(res.data)
          }
        }catch (err) {
          console.error('Failed to fetch wishlist', err);
        }
    
      }

      const fetchAPI2 = async ()=>{
        try{
          if(user){
            // console.log('sending req')
          const res = await axios.get(`http://localhost:8080/borroweddates?name=${user.name}`)
          console.log(res.data)
          setborrowedDates(res.data)
          }
        }catch (err) {
          console.error('Failed to fetch wishlist', err);
        }
    
      }

      const fetchAPI3 = async ()=>{
        try{
          if(user){
            // console.log('sending req')
          const res = await axios.get(`http://localhost:8080/g?name=${user.name}`)
          console.log('g',res.data)
          setg(res.data)
          }
        }catch (err) {
          console.error('Failed to fetch wishlist', err);
        }
    
      }

      useEffect(()=>{
          fetchAPI()
          fetchAPI2()
          fetchAPI3()
        },[])

    const genres = [
  {
    name: "Fiction",
    image: "https://cdn-icons-png.flaticon.com/128/864/864685.png",
    color: "#f7efe6",
  },
  {
    name: "Science Fiction",
    image: "https://cdn-icons-png.flaticon.com/128/2285/2285485.png",
    color: "#e7e9fe",
  },
  {
    name: "Mystery",
    image: "https://cdn-icons-png.flaticon.com/128/711/711319.png",
    color: "#e9e9fd",
  },
  {
    name: "Non-Fiction",
    image: "https://cdn-icons-png.flaticon.com/128/702/702814.png",
    color: "#f5f5f8",
  },
  {
    name: "Romance",
    image: "https://cdn-icons-png.flaticon.com/128/1077/1077035.png",
    color: "#fef0f0",
  },
];

const t = Object.keys(g).map((cur)=>{
  console.log('curr',g[cur])
  const temp = genres[cur] || {
    name: g[cur].name,
    image: "https://cdn-icons-png.flaticon.com/128/2910/2910791.png", 
    color: "#f0f0f0" 
  };
  return {
    ...temp,
    count: g[cur].count
  }
})

console.log('t is',t)


    // const borrowedDates = [
    //   { date: new Date(2025, 4, 21), title: "The Silent Patient", type: "borrowed" },
    //   { date: new Date(2025, 4, 25), title: "Dune", type: "due" },
    //   { date: new Date(2025, 4, 30), title: "1984", type: "borrowed" },
    //   { date: new Date(2025, 5, 5), title: "Pride and Prejudice", type: "returned" },
    //   { date: new Date(2025, 5, 10), title: "The Alchemist", type: "due" },
    // ];

        useEffect(() => {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
        mainContent.style.overflow = 'hidden'; 
        }

        return () => {
        if (mainContent) {
            mainContent.style.overflow = '';  
        }
        };
    }, []);

  //     const books = [
  //   {
  //     title: "The Silent Patient",
  //     author: "Alex Michaelides",
  //     bdate: "2025-04-01",
  //     duedate: "2025-05-01",
  //     status: "On Time",
  //     image: "https://books.google.co.in/books/publisher/content?id=a6NnDwAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U0sd_ARiItXsE4NzgkoT7C5xKacag&w=1280"
  //   },
  //   {
  //     title: "Atomic Habits",
  //     author: "James Clear",
  //     bdate: "2025-03-20",
  //     duedate: "2025-04-20",
  //     status: "Overdue",
  //     image: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg"
  //   },
  //   {
  //     title: "Educated",
  //     author: "Tara Westover",
  //     bdate: "2025-04-10",
  //     duedate: "2025-05-10",
  //     status: "Due Soon",
  //     image: "https://m.media-amazon.com/images/I/71-4MkLN5jL._AC_UF1000,1000_QL80_.jpg"
  //   },
  //   {
  //     title: "The Alchemist",
  //     author: "Paulo Coelho",
  //     bdate: "2025-03-01",
  //     duedate: "2025-03-30",
  //     status: "Overdue",
  //     image: "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg"
  //   },
  //   {
  //     title: "Normal People",
  //     author: "Sally Rooney",
  //     bdate: "2025-04-15",
  //     duedate: "2025-05-15",
  //     status: "On Time",
  //     image: "https://m.media-amazon.com/images/I/71fnqwR0eSL._AC_UF1000,1000_QL80_.jpg"
  //   }
  // ];


    return(
        <>
        
            <div className="container">
                
                <div className="left">
                    <p className="wishtitle">
                        My Borrowed Books
                    </p>
                    {/* {title,author,bdate,duedate,status,image} */}
                    {books.map((b,index)=>(
                      <Borrowcomp title={b.title} author={b.author} bdate={b.bdate} duedate={b.duedate} status={b.status} image={b.image} key={index}  />
                    ))}
                    <div className="space"></div>
                </div>
                <div className="right">
                    <div className="calander">
                        <CalendarComponent onChange={setDate} value={date} borrowedDates={borrowedDates.map((d)=>(
                          {
                            ...d,
                            date: new Date(d.date)
                          }
                        ))} />
                        <div className="genre-container">
                            <ul>
                            {t.map((item,index)=>(
                                <li key={index}><Genre image={item.image} title={item.name} count={item.count} color={item.color} /></li>
                            ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default Borrowedbooks



