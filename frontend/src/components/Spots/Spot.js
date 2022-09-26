import './Spot.css'

// import { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
function Spot({spot}){
    const history = useHistory()

   const onClickHandler = () => {
        history.push(`/spots/${spot?.id}`)
   }


   let rating= "New"
   if(spot?.Reviews?.length > 0){
       let stars=0;
       spot?.Reviews?.forEach(review => stars += review?.stars)
       rating = (stars/spot?.Reviews?.length)?.toFixed(1)
   }


    return(


            <div className='card' onClick={onClickHandler}>

                <div className='imageContainer'>
                   {spot?.Images && <img className = 'spotImage'src={spot?.Images[0]?.image} alt={spot?.name}/>}

                </div>
                <div className='textContainer'>
                    {/* <div> */}
                       <li className='name'>{spot?.name}</li>
                       <li className='address'>{spot?.address},{spot?.state}</li>
                       <li className='price'> <b>${spot?.price}</b> night</li>
                     {/* </div> */}

                        <p className='star'><i class="fa-solid fa-star"></i>{rating}</p>

                </div>


            </div>


    )
}

export default Spot
