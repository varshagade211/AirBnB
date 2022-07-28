import { useEffect, useState } from 'react'
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
    // const [isAvailableSpots, setIsAvailableSpots] =useState(true)

    useEffect(()=>{
        const reponse = dispatch(loadCurrentUserSpotsThunk())
    },[dispatch])
    let isAvailableSpots
    if(!spots?.length){

     isAvailableSpots =false

    }else{
        isAvailableSpots =true
    }

    return(
        <div className='spotsContainer'>
            {!isAvailableSpots && <h4>Don't Have Spots Plaese Create !!!</h4>}
            {spots?.map(spot => <Spot spot={spot}></Spot>)}

        </div>
    )
}

export default CurrentUserSpots
