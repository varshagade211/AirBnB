
import {useParams , useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './SingleSpot.css'
import { useEffect, useState } from 'react'
import {loadSpotsThunk,deleteCurrentUserSpotsThunk} from '../../store/spots'
function SingleSpot(){
    let {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded,setIsLoaded] = useState(false)

    const spots = useSelector(state => state?.spots)

    const sessionUser = useSelector(state => state?.session?.user)

    // let singleSpot
    // if(spots){
    //     singleSpot = spots[id]
    // }

    // let isOwner = false
    // if(sessionUser?.id === singleSpot?.ownerId) isOwner = true
    useEffect(()=>{
        dispatch(loadSpotsThunk())
    },[dispatch])

    let singleSpot
    if(spots){
        singleSpot = spots[id]
    }

    let isOwner = false
    if(sessionUser?.id === singleSpot?.ownerId) isOwner = true

    const deleteHandler = async() =>{
       const response= await dispatch(deleteCurrentUserSpotsThunk(singleSpot))
       history.push('/api/spots/user/spots')
    }

    const EditHandler = () =>{
        history.push(`/spots/edit/${id}`)
    }
    const firstImg=  singleSpot?.Images[0]
    const Images = singleSpot?.Images.slice(1)

    return(

        <div>
         <div className='singlePageImageContainer'>
                <div >
                  <img  className = 'firstSingleSpotImage'src= {firstImg?.image} />
                </div>
                <div className='singleSpotImgsContainer'>
                   {Images?.map((image)=>  <div><img className = {`singleSpotImgs`} src= {image?.image} /> </div>)}

                </div>
            </div>
            <div>
                <h5>{singleSpot?.name}</h5>
                <p>{singleSpot?.description}</p>
                <span>{singleSpot?.price}</span>
                <p>{singleSpot?.address},{singleSpot?.address},{singleSpot?.state}</p>
            </div>
            {isOwner&& <div>
                <button onClick={EditHandler}>Edit Spot</button>
                <button onClick={deleteHandler}>DELETE Spot</button>
            </div>}
        </div>
    )
}


export default SingleSpot
