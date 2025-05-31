import '../styles/datacard.css'
import { useState , useEffect } from 'react'

function Datacard(props){

    const [isEditing,setIsEditing] = useState(false)
    const [currentValue,setCurrentValue] = useState(props.data)

    function handleclick(){
        // const img = document.querySelector('.editicon')
        const img = document.querySelectorAll('.editicon')
        img.forEach((_,index)=>{
            img[index].style.opacity=0
        })
        // img.style.opacity=0
        setIsEditing(true)
    }

    function handlechange(e){
        setCurrentValue(e.target.value)
    }

    const editdisplay = ()=>{
        if(props.edit==='y'){
            return(<img className="editicon" src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png" alt="" onClick={handleclick}/>)
        }
    }

    function handleblur(){
        if(currentValue===''){
            setCurrentValue(props.data)
        }
        const img = document.querySelectorAll('.editicon')
        img.forEach((_,index)=>{
            img[index].style.opacity=1
        })
        // img.style.opacity=1
        setIsEditing(false)
    }

    return(
        <>
        
        <div className="datacard">
        <img className="dicon" src={props.image} alt="" />
        <p className={`namelabel ${props.databox==='n'?'extrawidth':''}`}>
                {props.label}: 
        </p>
        <div className={'gh'}>
            {isEditing?
            <input type='text' value={currentValue} onChange={handlechange} onBlur={handleblur} className='inputbox' 
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    handleblur();
                }
            }}/>
            :
            <p className={`data ${props.databox==='y'? '':'no'} nopadding`}>{currentValue}</p>}
            
            </div>
        {editdisplay()}
        </div>
        

        </>
    )
}
export default Datacard
