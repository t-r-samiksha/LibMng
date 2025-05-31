import Vbook from './vbook.jsx'
import '../styles/Wishlist.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from "../context/usercontext.jsx"

function Wishlist(){

  const { user } = useContext(UserContext)
  const [list,setlist] = useState([])

  const fetchAPI = async ()=>{
    try{
      if(user){
      console.log(user.name)
      const res = await axios.get(`http://localhost:8080/wishlist?name=${user.name}`)
      setlist(res.data)}
    }catch (err) {
      console.error('Failed to fetch wishlist', err);
    }

  }

  useEffect(()=>{
    fetchAPI()
  },[])

  useEffect(()=>{
    if (user?.Wishlist) {
      fetchAPI();
    }
  }, [user?.wishlist]);

    return(
        <>
        <p className='wishtitle'>Wish List</p>
        <div className="recdiv">
        {list
          .filter(item => user?.wishlist?.includes(item.title))
          .map((item, index) => (
            <Vbook
              author={item.author_name}
              title={item.title}
              status={1}
              image={item.image}
              key={index}
            />
        ))}

        </div>
        </>
    )
}
export default Wishlist