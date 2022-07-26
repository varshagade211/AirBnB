import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {loadSpotsThunk} from '../../store/spots.js'
import {loadAllImageThunkCreator} from '../../store/image.js'

import Spot from './Spot.js'
import './AllSpots.css'
function AllSpots(){
    const dispatch = useDispatch()
    const spots = useSelector(state => state?.spots?.spots)

    useEffect(()=>{
        dispatch(loadSpotsThunk())
        dispatch(loadAllImageThunkCreator())
    },[dispatch])

    return(

        <div className='spotsContainer'>
            {spots?.map(spot => <Spot spot={spot}></Spot>)}
        </div>
    )
}

export default AllSpots
