import '../styles/sidebar.css'
import Acc from '../components/acc.jsx'
import { useNavigate , useLocation  } from 'react-router-dom';


function Sidebar(){

    const navigate = useNavigate();
    const loc = useLocation();

   const content = [
        { name: "Home", path: "/home" },
        { name: "Borrowed Books", path: "/myborrowedbooks" },
        { name: "Wish List", path: "/wishlist" },
        { name: "Book Search", path: "/booksearch" },
        { name: "Notifications", path: "/notifications" },
    ];

    const uljsx = content.map(
        (c,index)=>
        <li key={index}>
        <button className={`button ${loc.pathname===c.path?'active':''}`} onClick={()=>{
            console.log("clicked",c)
            navigate(c.path);
            console.log(c.path);
            }
            }>
            {c.name}
        </button>
        </li>
        )
    
    return(
        <>
        <div className="sbmain">
            <h2>LibMng</h2>
            <div className="sidebarbox">
                
                <ul>
                    {uljsx}
                </ul>
            </div>
        <div className="account">
        <Acc />
        </div>
        </div>
        </>
    )
}
export default Sidebar;