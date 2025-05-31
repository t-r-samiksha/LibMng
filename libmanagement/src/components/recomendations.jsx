import Vbook from './vbook.jsx';
import '../styles/rec.css'
import { useEffect , useState} from 'react'
import axios from "axios"


function Recommendations(){

  const [books,setbooks] = useState([])

  const fetchAPI = async ()=>{
    const res = await axios.get("http://localhost:8080/recommendations")
    console.log(res.data)
    setbooks(res.data)
  }

  useEffect(()=>{
    fetchAPI()
  },[])

    return(
        <>
        <p className="boxtitle" style={{paddingTop: 0,marginTop: 0}}>
            Most Popular Books
        </p>
        <div className="recdiv">
        {books.map((item,index)=>(
            // <Vbook author={item.author} title={item.title} status={item.status} image={item.image} key={index} />
            <Vbook author={item.author_name} title={item.title} image={item.image} key={index} />
        ))}
        </div>
        </>
    )
}
export default Recommendations