import './Spot.css'

// import { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
function Spot({spot}){
    const history = useHistory()
//    const [showSingleSpot,setSingleShowSpot] = useState(false)

   const onClickHandler = () => {
        history.push(`/api/spots/${spot.id}`)
    //   return  <Redirect to={`/api/spots/${spot.id}`} />
   }
    return(

            <div className='card' onClick={onClickHandler}>
                <div className='imageContainer'>
                   <img className = 'spotImage'src={spot?.Images[0]?.image} alt={spot?.name}/>

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
