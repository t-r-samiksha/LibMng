import '../styles/acc.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserContext } from "../context/usercontext.jsx"

function Acc(){

    const nav = useNavigate()
    const { user } = useContext(UserContext)

    function accfunc(){
        nav('/profilesettings')
    }

    return(
        <>
        <div className="profile" onClick={accfunc}>
            <img src="https://cdn-icons-png.flaticon.com/128/11820/11820145.png" alt="" height={34} />
            <button className="acc">{user.name}</button>
        </div>
        <div className="logout">
            <img src="https://cdn-icons-png.flaticon.com/128/4400/4400629.png" alt="" height={34} />
            <button className="logout" onClick={()=>{
                if (confirm("Are you sure you want to proceed?")) {
                        nav('/')
                        }
            }
                }>Logout</button>
        </div>
        </>
    )
}
export default Acc;