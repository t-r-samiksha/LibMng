import { useEffect } from 'react';
import '../styles/borrowcomp.css'

function Borrowcomp({title,author,bdate,duedate,status,image}){
    const dotfunc = ()=>{
        let ret=''
        switch(status){
                case 'Due Soon':
                    ret='borrowed'
                    break;
                case 'Overdue':
                    ret='due'
                    break;
                case 'On Time':
                    ret='returned'
                    break;
                
            }
            return ret
        }

    function formatDate(datestr){
        const date = new Date(datestr);
        const [y,m,d] = [date.getFullYear(),date.getMonth(),date.getDate()]
        return `${y}-${m.toString().length===1?`0${m}`:m}-${d.toString().length===1?`0${d}`:d}`
    }

    // useEffect(()=>{
    //     formatDate('date',bdate);
    // },[])

    return(
        <>
        <div className="blayout">
            <img src={image} alt="" />
            <div className="titleandauthor">
                <p className='title'>{title}</p>
                <p className='author'>{author}</p>
                <p className="bdate">Borrowed date: {formatDate(bdate)}</p>
                <p className="duedate">Due date: {formatDate(duedate)}</p>
                <div className="dotbox">
                <div className={`circle ${dotfunc()}`}></div>
                <p className="status">{status}</p>
                </div>
            </div>     
        </div>
        </>
    )
}
export default Borrowcomp