import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { loadCurrentUserSpotsThunk } from '../../store/spots.js'
import Spot from './Spot.js'
import './AllSpots.css'
import { useHistory } from 'react-router-dom'

function CurrentUserSpots(){
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => state?.spots?.userSpot)
    const sessionUser = useSelector(state => state.session.user);

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
