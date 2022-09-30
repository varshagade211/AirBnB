import { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { loadCurrentUserSpotsThunk } from '../../store/spots.js'
import Spot from './Spot.js'
import './AllSpots.css'
import { useHistory } from 'react-router-dom'
import './CurrentUserSpot.css'
import welcome from '../../image/welcome_image.JPG'
import Footer from '../Footer.js'
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
    const becomeHosthandler= () => {
        history.push('/becomehost')
    }

    return(
        <div>

        <div className='currentUserSpotsContainer'>
            {!isAvailableSpots && <div className='nospotContainer'>
                <div className='welcomeTxtContainer'>
                    <div className='welComeTxt'>

                    <p className='welcomeTxtHeading'>No Listings Created...yet!</p>
                    <p className='welcomeTxSubHeading'>Time to dust off your bags and start hosting your sweet home</p>
                    <button className='welcomeBecomeHostBtn'onClick={becomeHosthandler}>Become Host</button>
                    </div>
                </div>
                <div className='welcomeImgContainer'>
                    <img className='welcomeImage' src={welcome} alt='welcomeImage'/>
                </div>

                </div>}
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

export default CurrentUserSpots
