
import {useParams , useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './SingleSpot.css'
import { useEffect } from 'react'
import {loadSpotsThunk,deleteCurrentUserSpotsThunk} from '../../store/spots'
function SingleSpot(){
    let {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()


    const spots = useSelector(state => state?.spots)

    const sessionUser = useSelector(state => state?.session?.user)

    let singleSpot
    if(spots){
        singleSpot = spots[id]
    }

    let isOwner = false
    if(sessionUser?.id === singleSpot?.ownerId) isOwner = true

    useEffect(()=>{
        dispatch(loadSpotsThunk())
    },[dispatch])

    const deleteHandler = async() =>{
       const response= await dispatch(deleteCurrentUserSpotsThunk(singleSpot))
       history.push('/api/spots/user/spots')
    }

    const EditHandler = () =>{
        history.push(`/spots/edit/${id}`)
    }

    const Images = singleSpot?.Images
    return(
        <div>
            <div>
                {Images?.map((image)=><img className = 'singleSpotImg' src= {image?.image} />)
                }

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
