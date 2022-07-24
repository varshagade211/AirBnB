import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { loadSpotsThunk } from '../../store/spots.js'
import Spot from './Spot.js'
import './AllSpots.css'
function AllSpots(){
    const dispatch = useDispatch()
    const spots = useSelector(state => state?.spots?.spots)
    console.log("All spots : ",spots)
    useEffect(()=>{
         const reponse = dispatch(loadSpotsThunk())
         console.log(reponse)
    },[dispatch])

    // const oneSpot = spots[0]
    return(

        <div className='spotsContainer'>
            {spots?.map(spot => <Spot spot={spot}></Spot>)}
        </div>
    )
}

export default AllSpots
