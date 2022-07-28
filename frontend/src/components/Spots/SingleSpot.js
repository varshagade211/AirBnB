
import {useParams , useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './SingleSpot.css'
import { useEffect, useState } from 'react'
import {loadSpotsThunk,deleteCurrentUserSpotsThunk} from '../../store/spots'
function SingleSpot(){
    let {id} = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    const spots = useSelector(state => state?.spots)
    const sessionUser = useSelector(state => state?.session?.user)

    useEffect(()=>{
        dispatch(loadSpotsThunk())
    },[dispatch])

    let singleSpot
    if(spots){
        singleSpot = spots[id]
    }

    let isOwner = false
    if(sessionUser?.id === singleSpot?.ownerId) isOwner = true

    const deleteHandler = async() =>{
       const response= await dispatch(deleteCurrentUserSpotsThunk(singleSpot))
       history.push('/spots/user/spots')
    }

    const EditHandler = () =>{
        history.push(`/spots/edit/${id}`)
    }
    const firstImg=  singleSpot?.Images[0]
    const Images = singleSpot?.Images?.slice(1)

    const showImageHandler = () =>{
        history.push(`/images/${singleSpot.id}`)
    }
    const backHandler = () => {

            history.push(`/`)
    }
    return(
        <div>
             <div className='singleSpotBackIconContainer' onClick={backHandler}>
            <i  class="fas fa-angle-left singleSpotBackarrowIcon"></i>
            </div>
            <div className='singleSpotOuterContainer'>
                <h2 className='singleSpotHeading'>{singleSpot?.name}</h2>
                <div className='spotAndStartContainer'>
                    <p ><i className="fa-solid fa-star singleSpotStar"></i> 5.0      .</p>
                    <p className='superHost'><i className="fa-solid fa-medal superHostMedal"></i>Superhost      .</p>
                    <p className='singleSpotAddress'>{singleSpot?.address},{singleSpot?.address},{singleSpot?.state}</p>
                </div>

                <div className='singleSpotAllImageContainer' onClick={showImageHandler}>
                    <div className='singleSpotFirstImageContainer'>
                        <img  className = 'singleSpotFirstImage'src= {firstImg?.image} />
                    </div>
                    <div className='singleSpotRemainingImgsContainer'>
                        {/* {Images?.map((image)=>  <div className='insideContainer'><img className = {`singleSpotImgs`} src= {image?.image} /> </div>)} */}
                        {Images?.map((image)=>  <img className = {`singleSpotImgs`} src= {image?.image} /> )}
                    </div>
                </div>

                <div className='infoContainer'>
                    <div className='dataContainer'>
                        <h2 className='sessionName' >Entire home hosted by {sessionUser?.firstName} {sessionUser?.lastName}</h2>
                        <p>6 guests .3 bedrooms . 4 beds . 3 baths</p>
                        <hr className='line'></hr>
                        <p className='greatText'> <i className="fa-solid fa-key keyIcon"></i>  Great check-in experience</p>
                        <p className='keyText'>100% of recent guests gave the check-in process a 5-star rating.</p>
                        <p className='grestlocationText'> <i className="fa-solid fa-location-dot locationIcon"></i>  Great location</p>
                        <p className='locationText'>100% of recent guests gave the location a 5-star rating.</p>
                        <p className='experience'>  <i className="fa-solid fa-star"></i>  Experienced host</p>
                        <p className='freeCancelation'><i class="fa-solid fa-calendar"></i>  Free cancellation for 48 hours.</p>
                        <hr className='line'></hr>
                        <h1><b><span className='airTxt'>air</span>cover</b></h1>
                        <p className='policyText'>Every booking includes free protection from Host cancellations,<br/>
                        listing inaccuracies, and other issues like trouble checking in.</p>
                        <p className='learnMore'>Learn more</p>
                        <hr className='line'></hr>
                        <div className='descriptionContainer'>
                        <p className='description'>{singleSpot?.description}</p>
                        </div>

                        <hr className='line'></hr>
                        <h2 className='offers'>What this place offers</h2>
                        <div>
                            <p className='tv'><i className="fa-solid fa-tv tvIcon"></i>  TV with standard cable</p>
                            <p className='petPaw'><i className="fa-solid fa-paw pawIcon"></i>  Pets allowed</p>
                            <p className='wifi'><i className="fa-solid fa-wifi wifiIcon"></i>  Wifi</p>
                            <p className='parking'><i className="fa-solid fa-car carIcon"></i>  Free parking on premises</p>
                            <p><i className="fa-solid fa-umbrella-beach beachIcon"></i>  Beach access -Beachfront</p>
                            <p className='airConditioning'><i className="fa-solid fa-snowflake airIcon"></i>  Portable air conditioning</p>
                        </div>
                    </div>
                    <div className='sideBarContainer'>
                       <div className='sideBar'>
                          <h2 className='singleSpotPrice'>${singleSpot?.price} / night</h2>
                        <button className='bookingBtn' disabled={true}>Reserve</button>
                    </div>
                    {isOwner&&
                       <div className='editDeletebuttons'>
                          <button className='ediBtn' onClick={EditHandler}>Edit Listing</button>
                          <button  className='deleteBtn'  onClick={deleteHandler}>Delete Listing</button>

                       </div>
                    }
                    </div>
                </div>
                <hr className='line'></hr>
                <footer className='footer'>
                    <p>© 2022 airbnb-spots, Inc, . Privacy·Terms·Sitemap</p>
                    <p> <i className="fa-solid fa-globe languageIcon"></i>English (US)</p>
                </footer>


            </div>
        </div>
    )
}


export default SingleSpot
