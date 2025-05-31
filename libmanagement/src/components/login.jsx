import { UserContext } from "../context/usercontext"
import { useContext, useState , useEffect } from "react"
import loginImg from '../assets/Library-amico.png'
import '../styles/login.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Login() {

    const { setUser} = useContext(UserContext)
    const [name,setname] = useState('')
    const [pass,setpass] = useState('')
    const nav = useNavigate()

    const checkInputType = (input) => {
        
        if (input.includes('@')) {
            return "email";
        } else {
            return 'membership id'
        }
        };

    const fetchAPI = async ()=>{
        const type = checkInputType(name);
        const res = await axios.post("http://localhost:8080/login",{
            input: name,
            type: type,
            password: pass
        })
        console.log("data ",res.data.userdata)
        if(!res.data.success){
            alert(res.data.error)
        }else{
            setUser(res.data.userdata)
            nav('/home')
        }
    }

    function loginbuttonfunc(){
        fetchAPI()
        console.log(name,pass)
    }

    return (
        <div className="login-container">
            <div className="sumac"></div>
            <div className="login-form">
                <p>Welcome to LibMng</p>
                <p className="inp-label">Membership Id/Email</p>
                <input type="text" className="login-input" value={name} onChange={(e)=>setname(e.target.value)} />
                <p className="inp-label">Password</p>
                <input type="password" className="login-input" value={pass} onChange={(e)=>setpass(e.target.value)} />
                <button className="button-login" onClick={loginbuttonfunc}>Login</button>
                <p className="donthaveanacc">
                    Don't have an account? <span className="signup">Contact Us</span>
                </p>
            </div>
            <img src={loginImg} alt="Login Illustration" className="loginimg" />
        </div>
    );
}

export default Login;
