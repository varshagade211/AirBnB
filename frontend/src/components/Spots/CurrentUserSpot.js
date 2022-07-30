import { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { loadCurrentUserSpotsThunk } from '../../store/spots.js'
import Spot from './Spot.js'
import './AllSpots.css'
import { useHistory } from 'react-router-dom'
import './CurrentUserSpot.css'
import welcome from '../../image/welcome_image.JPG'
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
        <div className='spotsContainer'>
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
            {spots?.map(spot => <Spot spot={spot}></Spot>)}

        </div>
    )
}

export default CurrentUserSpots
