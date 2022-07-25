
import {useParams , useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './SingleSpot.css'
import { useEffect } from 'react'
import {loadSpotsThunk,deleteCurrentUserSpotsThunk} from '../../store/spots'
function SingleSpot(){
    let {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    console.log('line---1')
    const spots = useSelector(state => state?.spots)
    console.log('line---2')
    const sessionUser =useSelector(state => state?.session?.user)
    console.log('line---3')
    let singleSpot
    if(spots){
        singleSpot = spots[id]
    }

    console.log('line---4')

    let isOwner = false
    console.log('line---5')
    if(sessionUser?.id === singleSpot?.ownerId) isOwner = true

    useEffect(()=>{
        console.log('in userEffect line---6')
        dispatch(loadSpotsThunk())
    },[dispatch])

    const deleteHandler = async() =>{
        console.log('line in delete handler---7')
       const response= await dispatch(deleteCurrentUserSpotsThunk(singleSpot))
       console.log('response after spot deletion', response)
       history.push('/api/spots/user/spots')

    }
    const EditHandler = () =>{

        history.push(`/spots/edit/${id}`)

     }
    console.log('singleSpot',singleSpot)
    console.log(id)
    const Images = singleSpot?.Images
    console.log('images from single spot',Images)
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

