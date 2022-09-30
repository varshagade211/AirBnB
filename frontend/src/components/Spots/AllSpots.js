import { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {loadSpotsThunk} from '../../store/spots.js'
import {loadAllImageThunkCreator} from '../../store/image.js'
import Footer from '../Footer.js'
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
      <div className='allSpotContainer'>
          <div className='spotsContainer'>
            {spots?.map(spot => <Spot key={spot?.id} spot={spot}></Spot>)}

           </div>

        <hr className='line hrLineAllSpot'></hr>
        <Footer />
            {/* <footer className='footerOnHomePage'>

                 <p className='footerTxt'>© 2022 spots-bnb, Inc, . Privacy·Terms·Sitemap</p>
                 <div className='footerAboutLinksContainer'>
                    <a href= "https://www.linkedin.com/in/varsha-gade-7b33aa174/"  target="_blank" className='linkedInLink'><i className="fa-brands fa-linkedin linkedInIcon"></i></a>
                    <a href='https://github.com/varshagade211/AirBnB' target="_blank" className='gitHubLink'><i className="fa-brands fa-github gitHubIcon"></i></a>
                    <a href="https://varshagade211.github.io/" target="_blank" className='portfolioLink'><i className="fa-solid fa-folder-open portfolioIcon"></i></a>

              </div>
                <p className='footerTxt'> <i className="fa-solid fa-globe languageIcon"></i>English (US)</p>
            </footer> */}

      </div>

    )
}

export default AllSpots
