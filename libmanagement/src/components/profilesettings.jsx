import '../styles/Profilesettings.css'
import Datacard from './datacard.jsx';
import { UserContext } from '../context/usercontext.jsx';
import { useContext } from 'react';

function Profilesettings(){

    const {user} = useContext(UserContext)

    // const userProfile = {
    //     // name: "Samiksha",
    //     name: user.name?user.name:'No name',
    //     memid: "LIB1023",
    //     // email: "samiksha@example.com",
    //     email: user.email?user.email:'no@mail',
    //     memberSince: "2024-01-12",
    //     currentBorrowed: 2,
    //     totalBorrowed: 14,
    //     pendingFine: 15,
    //     borrowedBooks: [
    //         {
    //             title: "The Alchemist",
    //             dueDate: "2025-05-20",
    //             returnDate: "2025-05-23",
    //             lateByDays: 3,
    //             fine: 15,
    //             paid: false
    //         },
    //         {
    //             title: "1984",
    //             dueDate: "2025-05-15",
    //             returnDate: "2025-05-20",
    //             lateByDays: 5,
    //             fine: 25,
    //             paid:true
    //         }
    //     ]
    // };

    function calccb(bl){
        // console.log(bl)
        let c= 0;
        for(let b of bl){
            c+=b.returned_date===null?1:0;
        }
        // console.log(c)
        return c
    }

    function formatDate(datestr){
         const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(datestr);
        const [y,m,d] = [date.getFullYear(),months[date.getMonth()],date.getDate()]
        return `${d.toString().length===1?`0${d}`:d}-${m.toString().length===1?`0${m}`:m}-${y}`
    }

    function sub(d1,d2){
    const date1 = new Date(d1)
    const date2 = new Date(d2)

    const result = (date1-date2)/(1000*60*60*24)
    // console.log(result)

    return Math.ceil(result)
}

    return(
        <>
        <p className="wishtitle">
            Account
        </p>
        <div className="firstpart">
            
            <Datacard label="Name" databox='y' data={user.name} image='https://cdn-icons-png.flaticon.com/128/1077/1077012.png' edit='y' />

            <div className="memid">
                <Datacard label="Membership ID" databox='y' data={user.membership_id} image='https://cdn-icons-png.flaticon.com/128/7186/7186404.png' edit='n' />
            </div>
            <div className="emaillabel">
                
                <Datacard label="Email" databox='y' data={user.email} image='https://cdn-icons-png.flaticon.com/128/9068/9068642.png'  edit='y'/>
            </div>
            <div className="memsince">
            <Datacard label="Member Since"  databox='y' data={formatDate(user.member_since)} image='https://cdn-icons-png.flaticon.com/128/4807/4807598.png' edit='n' />
            </div>
        </div>
        <div className="secondpart">
            <div className="bb">
                
                <Datacard label="Books Borrowed Now" data={calccb(user.books_borrowed)} image='https://cdn-icons-png.flaticon.com/128/11259/11259150.png' databox='n' edit='n' />
            </div>
            <div className="bb">
                <Datacard label="Total Books Borrowed" data={user.books_borrowed.length} image='https://cdn-icons-png.flaticon.com/128/5832/5832416.png' databox='n'  edit='n'/>
            </div>
            <div className="bb">
                <Datacard label="Pending Fine" data={user.pending_fine} image='https://cdn-icons-png.flaticon.com/128/7256/7256192.png' databox='n' edit='n' />
            </div>
        </div>
        <div className="thirdpart">
            <p className="overduelabel">
                <img src="https://cdn-icons-png.flaticon.com/128/4334/4334537.png" alt="" className='alarm' />
                Overdue Books   
            </p>
            <div className="duebook">
                {
                    user.books_borrowed.map((item,index)=>{
                        if(item.returned_date){
                        return <li key={index}>
                            <div className="duebookcontainer">
                                <img src="https://cdn-icons-png.flaticon.com/128/18991/18991804.png" alt="" className="bookicon" />
                                <div className="bdetprofile">
                                    <p className="btitle">{item.name}</p>
                                    <p className="bdet">Due Date:  {formatDate(item.due_date)}</p>
                                    <p className="bdet">Returned On:   {formatDate(item.returned_date)}</p>
                                    <p className="bdet">Late by: {sub(item.due_date,item.returned_date)}</p>
                                    <p className="bdet"> Fine: {12}</p>
                                    <p className={item.status==='paid'?"paid-yes":'paid-no'} >{item.status==='paid'?"paid":"not paid"}</p>
                                </div>
                            </div>
                        </li>}
                    })
                }
            </div>
        </div>
        <div className="endspace"></div>
        </>
    )
}
export default Profilesettings