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
      <div>
          <div className='spotsContainer'>
            {spots?.map(spot => <Spot spot={spot}></Spot>)}

        </div>
        <hr className='line hrLineAllSpot'></hr>

           <footer className='footerOnHomePage'>

                 <p>© 2022 Spots-bnb, Inc, . Privacy·Terms·Sitemap</p>
                <p> <i className="fa-solid fa-globe languageIcon"></i>English (US)</p>
            </footer>
      </div>

    )
}

export default AllSpots
