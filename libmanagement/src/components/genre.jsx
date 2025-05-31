import '../styles/genre.css'

function Genre({title , count, image, color}){
    return(
        <>
        <div className="g" style={{backgroundColor:color}}>
            <div className="f">
                <img className='gimg' src={image} alt="" />
                <p className='gtitle'>{title}</p>
            </div>
            <p className='gcount'>{count}</p>
        </div>
        </>
    )
}
export default  Genre