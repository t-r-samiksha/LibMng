import { useLocation } from 'react-router-dom';
import '../styles/topbar.css'
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../context/usercontext"
import { useContext, useState , useEffect } from "react"

function Topbar(){

    const { user } = useContext(UserContext)

    const nav = useNavigate();

    const notif = ()=>{
        nav('/notifications')
    } 

    function searchtab(){
        nav('/booksearch/search')
    }

    function handleenterkey(e){
        if(e.key==='Enter'){
            const value = e.target.value;
            console.log(value)
            nav(`/booksearch/search?title=${value}`)
        }
    }

    return(
        <>
        {user.balance===0 && <div className="updatebalance">
                <img src="https://img.icons8.com/?size=100&id=360&format=png&color=FA5252" alt="" className='errorimage'/>
                <p className='errormsg'>Update your balance before borrowing more books.</p>
        </div>}
        
        <div className="topbar">
        <input type="text" className="searchbar" placeholder="Search books by title..." onClick={searchtab} onKeyDown={handleenterkey}/>
        <img src="https://cdn-icons-png.flaticon.com/128/2645/2645897.png" alt="" height={25} onClick={notif} className='notif'/>
        </div>
        </>
    )
}
export default Topbar;