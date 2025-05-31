import '../styles/notifcomp.css'

function Notifcomp({type , book, time}){

const notificationTypes = {
  wishlist: {
    icon: 'https://cdn-icons-png.flaticon.com/128/5610/5610944.png',
    title: `${book} is now available!`,
    subtitle: 'From your wishlist.'
  },
  duedate: {
    icon: 'https://cdn-icons-png.flaticon.com/128/4325/4325930.png',
    title: `${book} is due soon.`,
    subtitle: 'Return on or before due date.'
  },
  overdue: {
    icon: 'https://cdn-icons-png.flaticon.com/128/16750/16750201.png',
    title: `${book} is overdue.`,
    subtitle: 'Return immediately to avoid penalties.'
  },
  renewal: {
    icon: 'https://cdn-icons-png.freepik.com/256/3168/3168273.png?ga=GA1.1.897774130.1736149703&semt=ais_hybrid',
    title: `You renewed ${book}.`,
    subtitle: 'Renewal completed successfully.'
  },
  newfav: {
    icon: 'https://cdn-icons-png.flaticon.com/128/891/891448.png',
    title: `New book in your favorite genre: ${book}`,
    subtitle: 'Check it out now!'
  }
};

// reservation: {
//     icon: 'https://cdn-icons-png.flaticon.com/128/2460/2460875.png',
//     title: `${book} is ready for pickup.`,
//     subtitle: 'Your reservation is now available.'
//   },
//   reservationcancelled: {
//     icon: 'https://cdn-icons-png.flaticon.com/128/458/458594.png',
//     title: `Reservation for ${book} was cancelled.`,
//     subtitle: 'You can reserve again if needed.'
//   },

    const notif = notificationTypes[type]

    return(
        <>
            <div className="notifbox">
                <div className="tandstandicon">
                    <img className="icon" src={notif.icon} alt="" />
                    <div className="tandst">
                        <p className='ntitle'>{notif.title}</p>
                        <p className='subtitle'>{notif.subtitle}</p>
                    </div>
                </div>
                <p className='time'>{time}</p>
            </div>
        </>
    )
}
export default Notifcomp