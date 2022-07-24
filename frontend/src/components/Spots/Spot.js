import './Spot.css'
function Spot({spot}){
   console.log('hello from spot',spot)
    return(

            <div className='card'>
                <div className='imageContainer'>
                   <img className = 'spotImage'src={spot?.previewImage} alt={spot?.name}/>

                </div>
                <div className='textContainer'>
                    {/* <div> */}
                       <li className='name'>{spot?.name}</li>
                       <li className='address'>{spot?.address},{spot?.state}</li>
                       <li className='price'> <b>${spot?.price}</b> night</li>
                     {/* </div> */}

                        <p className='star'><i class="fa-solid fa-star"></i> 5.0</p>

                </div>
            </div>


    )
}

export default Spot
