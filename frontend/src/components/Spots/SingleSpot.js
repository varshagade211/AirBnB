
import {useParams , useHistory, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './SingleSpot.css'
import { useEffect, useState } from 'react'
import {loadSpotsThunk,deleteCurrentUserSpotsThunk} from '../../store/spots'
import * as reviewActions from '../../store/review'
import Navigation from "../Navigation"
import CreateReviewFormModal from '../CreateReviewModal'
import DeleteSpotModal from '../DeleteSpotModal'
import * as bookingActions from '../../store/bookings'


function SingleSpot(){
    let {id} = useParams()
    let [startDate,setStartDate] = useState('')
    let [endDate, setEndDate] = useState('')
    const [errors, setErrors] = useState({});
    const [diffrenceInDate, setDiffrenceInDate] = useState(0)
    const [totalFeesByDay, setTotalFeesByDays] = useState(0)
    const [totalBill, setTotalBill] = useState(0)
    const [serviceFees, setServiceFees] = useState(0)
    const history = useHistory()
    const dispatch = useDispatch()

    const spots = useSelector(state => state?.spots)
    const sessionUser = useSelector(state => state?.session?.user)
    const reviews = useSelector(state => state?.reviews?.reviews)

    useEffect(()=>{
        dispatch(loadSpotsThunk())
        dispatch(reviewActions.loadSpotsReviewThunk(id))
    },[dispatch])


    let stars=0;
    reviews?.forEach(review => stars += review?.stars)
    let singleSpot
    if(spots){
        singleSpot = spots[id]

    }

    let isOwner = false
    if(sessionUser?.id === singleSpot?.ownerId) isOwner = true

    // const deleteHandler = async() =>{
    //    const response= await dispatch(deleteCurrentUserSpotsThunk(singleSpot))
    //    history.push('/spots/user/spots')
    // }

    const EditHandler = () =>{
        history.push(`/spots/edit/${id}`)
    }
    const firstImg=  singleSpot?.Images[0]
    const Images = singleSpot?.Images?.slice(1)
    let  singleClassName = 'singleSpotAllImageContainer'
    if(!Images?.length){
        singleClassName = 'singleSpotAllImageContaineIfOneImage'
    }
    let singleClassRemainingImages = 'singleSpotRemainingImgsContainer'


    const showImageHandler = () =>{
        history.push(`/images/${singleSpot?.id}`)
    }
    const backHandler = () => {
         history.push(`/`)
        if(isOwner){
          history.push('/spots/user/spots')
        }
    }

    const onBookingSubmit = ((e)=>{
        e.preventDefault()



        dispatch(bookingActions.createBookingThunk({spotId:singleSpot?.id,startDate,endDate}))
        .then((res) => {

            setStartDate("");
            setEndDate("")
            setErrors({message:"Successfully created your booking! see in trips"});
        })
        .catch(async (res) => {
            console.log(res)
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

    })
    const onEndDateChangeHandler = (e) => {
        setEndDate(e.target.value)
    }
    const onStartDateChangeHandler = (e) =>{
        setStartDate(e.target.value)


    }
    useEffect(()=>{
        if(endDate && startDate){
            let end = new Date(endDate)
            let start = new Date( startDate)
            let Difference_In_Time = end.getTime() - start.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if(Difference_In_Days > 0){
                setDiffrenceInDate(Difference_In_Days)
                setTotalFeesByDays(singleSpot?.price * Difference_In_Days)
                setTotalBill(singleSpot?.price * Difference_In_Days+ 100 +singleSpot?.price * diffrenceInDate/10)
                setServiceFees(singleSpot?.price * Difference_In_Days/10)
            }else{
                setDiffrenceInDate(0)
                setTotalFeesByDays(0)
                setTotalBill(0)
                setServiceFees(0)
            }

        }
    },[startDate,endDate])
    return(
        <div className='singalePageMainContainer'>
           <Navigation className='navContainer'/>
           <hr className='line'></hr>
            <div className='singleSpotBackIconContainer' onClick={backHandler}>
                <i  className="fas fa-angle-left singleSpotBackarrowIcon"></i>
            </div>
            <div className='singleSpotOuterContainer'>
                <h2 className='singleSpotHeading'>{singleSpot?.name}</h2>
                <div className='spotAndStartContainer'>
                    <div>
                       <p ><i className="fa-solid fa-star singleSpotStar"></i> 5.0 </p>
                    </div>
                    <div>
                       <p className='superHost'><i className="fa-solid fa-medal superHostMedal"></i> Superhost  </p>
                    </div>
                       <p className='singleSpotAddress'>{singleSpot?.address},{singleSpot?.address},{singleSpot?.state}</p>
                </div>

                <div className={singleClassName} onClick={showImageHandler}>
                    <div className='singleSpotFirstImageContainer'>
                        <img  className = 'singleSpotFirstImage'src= {firstImg?.image} />
                    </div>
                    <div className={singleClassRemainingImages}>

                        {Images?.map((image)=>  <img key={image?.id} className = {'singleSpotImgs'} src= {image?.image} /> )}


                    </div>
                </div>

                <div className='infoContainer'>
                    <div className='dataContainer'>
                        <h2 className='sessionName' >Entire home hosted by {singleSpot?.Owner?.firstName} {singleSpot?.Owner?.lastName}</h2>
                        <p>6 guests .3 bedrooms . 4 beds . 3 baths</p>
                        <hr className='line'></hr>
                        <p className='greatText'> <i className="fa-solid fa-key keyIcon"></i>  Great check-in experience</p>
                        <p className='keyText'>100% of recent guests gave the check-in process a 5-star rating.</p>
                        <p className='grestlocationText'> <i className="fa-solid fa-location-dot locationIcon"></i>  Great location</p>
                        <p className='locationText'>100% of recent guests gave the location a 5-star rating.</p>
                        <p className='experience'>  <i className="fa-solid fa-star"></i>  Experienced host</p>
                        <p className='freeCancelation'><i className="fa-solid fa-calendar"></i>  Free cancellation for 48 hours.</p>
                        <hr className='line'></hr>
                        <h1><b><span className='airTxt'>air</span>cover</b></h1>
                        <p className='policyText'>Every booking includes free protection from Host cancellations,<br/>
                        listing inaccuracies, and other issues like trouble checking in.</p>
                        {/* <p className='learnMore'>Learn more</p> */}
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
                   {singleSpot?.ownerId !== sessionUser?.id && <div className='sideBar'>
                            <div className='bookingPriceAndReviewContainer'>
                                <h2 className='singleSpotPrice'>${singleSpot?.price} / night</h2>
                                <p className='bookingStarsContainer'><i className="fa-solid fa-star bookinStar"></i>
                                {stars>0?(stars/reviews?.length).toFixed(1): 0} <span>|</span>  {reviews?.length} Reviews</p>


                            </div>
                            <form onSubmit={onBookingSubmit}>
                                <div className='dateInputLabelContainer'>
                                    <label className='dateLable' htmlFor="checkIn">Check In</label><br />
                                    <input className='dateInput' type="date" name="checkIn" id="checkIn"
                                    onChange={(e)=>onStartDateChangeHandler(e)}/>
                                      {errors?.startDate &&
                                        <div className="errorContainer">
                                            <div>
                                                <i className="fa-solid fa-circle-exclamation createFormErrorlogo"></i>
                                                <span className='createFormErrorError' key={errors.startDate}>{errors.startDate}</span>
                                            </div>

                                        </div>
                                    }
                                </div>
                                <div className='dateInputLabelContainer'>
                                    <label className='dateLable' htmlFor="checkOut">Check Out</label><br />
                                    <input className='dateInput' type="date" name="checkOut" id="checkOut"
                                    onChange={(e)=>onEndDateChangeHandler(e)} />
                                     {errors?.endDate &&
                                        <div className="errorContainer">
                                            <div>
                                                <i className="fa-solid fa-circle-exclamation createFormErrorlogo"></i>
                                                <span className='createFormErrorError' key={errors.startDate}>{errors.startDate}</span>
                                            </div>

                                        </div>
                                    }
                                     {errors?.date &&
                                        <div className="errorContainer">
                                            <div>
                                                <i className="fa-solid fa-circle-exclamation createFormErrorlogo"></i>
                                                <span className='createFormErrorError' key={errors.date}>{errors.date}</span>
                                            </div>

                                        </div>
                                    }
                                    {errors?.message &&
                                        <div className="errorContainer">
                                            <div>
                                                {/* <i class="fa-solid fa-circle-exclamation createFormErrorlogo"></i> */}
                                                <span className='createFormErrorError' key={errors.message}>{errors.message}</span>
                                                <NavLink to={'/bookings'}> Your Trips</NavLink>
                                            </div>

                                        </div>
                                    }
                                </div>
                                <div className='dateInputLabelContainer'>
                                    <button className='bookingBtn'>Reserve</button>
                                </div>
                                <div className='billingContainer'>
                                    <p className='youWontBeChargeTxt'>You won't be charged yet</p>
                                    <div className='calculationContainer'>
                                       <p className='billingInfo'>${singleSpot?.price} x {diffrenceInDate} night</p>
                                       <p className='billingInfo'>${totalFeesByDay}</p>
                                    </div>
                                    <div className='calculationContainer'>
                                    <p className='billingInfo'> Cleaning fee </p>
                                    <p className='billingInfo'>$100</p>

                                    </div>
                                    <div className='calculationContainer'>
                                        <p className='billingInfo'>Service fee</p>
                                        <p className='billingInfo'>${serviceFees}</p>

                                    </div>
                                <div className='calculationContainer totalContainer'>
                                    <p className='billingInfo'>Total before taxes</p>
                                    <p className='billingInfo'>${totalBill}</p>
                                </div>
                                </div>
                            </form>
                    </div>}
                       {isOwner&&
                            <div className='editDeletebuttons'>
                                <div className='bookingPriceAndReviewContainer'>
                                <h2 className='singleSpotPrice'>${singleSpot?.price} / night</h2>
                                <p className='bookingStarsContainer'><i className="fa-solid fa-star bookinStar"></i>
                                    {stars>0?(stars/reviews?.length).toFixed(1): 0} <span>|</span>  {reviews?.length} Reviews</p>

                            </div>
                              <button className='ediBtn' onClick={EditHandler}>Edit Listing</button>
                              <DeleteSpotModal singleSpot={singleSpot} className={"deleteBtn"}/>

                            </div>
                        }
                    </div>
                </div>
                <hr className='reviewLine'></hr>
                {/*------------------------------------------- reviews ------------------------------------------------------- */}
               <div className='reviewStarAddReviewContainer'>
                    <p className='reviewsStarsContainer'><i className="fa-solid fa-star"></i>
                    {stars>0 ? (stars/reviews?.length).toFixed(1): 0 } <span className='pipe'>|</span>  {reviews?.length} Reviews</p>
                    <CreateReviewFormModal className={'addReviewBtn'}/>

               </div>
                <div className='reviewOuterContainer'>

                   {reviews?.map(review => {
                      return(
                       <div className='reviewContainer'>
                        <div className='reviewuserNameAndDateContainer'>
                        <div className='userIconAndUserNameContainer'>
                            <i className="fa-solid fa-circle-user reviewUserIcon"></i>
                            <div>
                               <p className='reviewName'>{review?.User?.firstName} {review?.User?.lastName}</p>
                               <p className='reviewDate'>{new Date(review?.createdAt).toDateString()}</p>
                            </div>
                        </div>
                         <p className='reviewTxt'>{review?.review}</p>

                        </div>
                        </div>
                      )
                   })}

                </div>
                {/* <hr className='line'></hr>
                <footer className='footer'>
                    <p>© 2022 spots-bnb, Inc, . Privacy·Terms·Sitemap</p>
                    <p> <i className="fa-solid fa-globe languageIcon"></i>English (US)</p>
                </footer> */}


            </div>
        </div>
    )
}


export default SingleSpot
