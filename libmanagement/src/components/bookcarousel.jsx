import React from 'react';
import '../styles/bookcarousel.css';
import { useState , useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function BookCarousel() {

  const nav = useNavigate();

  const [books,setbooks] = useState([])

  const fetchAPI = async ()=>{
    const res = await axios.get('http://localhost:8080/booksearch/top3books')
    console.log(res.data)
    setbooks(res.data.top3)
  }

  useEffect(()=>{
    fetchAPI()
  },[])

  function move(title){
    nav(`/bookdetails/${title}`)
  }

  return (
    <section className="book-showcase">
      {books.map((book, index) => (
        <div key={index}>
            <div className="book-card" style={{ backgroundColor: book.bgColor }} >
          <img src={book.image} alt={book.title} className="book-cover" />
          <div className="book-info">
            <h4>{book.title}</h4>
            <p>by {book.author_name}</p>
            <div className="rating">
              {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
              <span>{book.noofreaders} votes</span>
            </div>
            <p className="desc">
              {book.shortSynopsis}
            </p>
            <button className="button-bookc" onClick={()=>{
              move(book.title)
              console.log("clicked");
            }}>See The Book</button>
          </div>
        </div>
        </div>

      ))}
    </section>
  );
}
export default BookCarousel;


