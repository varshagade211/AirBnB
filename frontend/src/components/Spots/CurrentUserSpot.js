import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { loadCurrentUserSpotsThunk } from '../../store/spots.js'
import Spot from './Spot.js'
import './AllSpots.css'
function CurrentUserSpots(){
    const dispatch = useDispatch()
    const spots = useSelector(state => state?.spots?.userSpot)

    useEffect(()=>{
         const reponse = dispatch(loadCurrentUserSpotsThunk())
     

    },[dispatch])


    return(

        <div className='spotsContainer'>
            {spots?.map(spot => <Spot spot={spot}></Spot>)}
        </div>
    )
}

export default CurrentUserSpots
