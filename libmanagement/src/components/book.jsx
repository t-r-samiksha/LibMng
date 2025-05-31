import '../styles/book.css'

function Book(props){

    return(
        <>
        <div className="booklayout">
            <img src={props.image} alt="" />
            <div className="titleandauthor">
                <p className='title'>{props.title}</p>
                <p className='author'>{props.author}</p>
                <p className={`deadline ${props.deadline<6?"red":""}`}>{props.deadline===0?`Today is the last day !!!`:`The deadline is in ${props.deadline} days!`}</p> 
            </div>     
        </div>
        </>
    )
}
export default Book