import Notifcomp from './notifcomp.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from "../context/usercontext.jsx"

function Notifications(){

    const { user } = useContext(UserContext)
    const [nlist ,setnlist ] = useState([])

    const fetchAPI = async ()=>{
        try{
          if(user){
          const res = await axios.get(`http://localhost:8080/notification?name=${user.name}`)
          //console.log('notif: ',res.data,user.name)
          setnlist(res.data)}
        }catch (err) {
          console.error('Failed to fetch wishlist', err);
        }
    
      }
    
      useEffect(()=>{
        fetchAPI()
      },[])

    return(
        <>
        <p className="wishtitle">
            Notifications
        </p>
        {
            nlist.map((n,index)=>(
                <Notifcomp type={n.type} book={n.book} time={n.time} key={index} />
            ))
        }
        </>
    )
}
export default Notifications