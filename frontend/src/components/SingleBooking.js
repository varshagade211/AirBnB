import { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as bookingActions from '../store/bookings'
import './SingleBooking.css'
import DeleteBookingModal from './DeleteBookingModal'
import EditBookingModal from './EditBookingModal'
function SingleBooking() {
    let dispatch = useDispatch()
    let bookings = useSelector(state => state?.bookings?.bookings)
    const [totalBill, setTotalBill] = useState(0)
    let history = useHistory()
    let {id} = useParams()
    useEffect(() => {
        dispatch(bookingActions.loadUserBookingThunk())
    },[dispatch])
    let parsedId = Number(id)
    let booking
    bookings.forEach(element => {
       if( element?.id === parsedId) booking = element

    });

    useEffect(()=>{
        if(booking?.endDate && booking?.startDate){
            let end = new Date(booking?.endDate)
            let start = new Date( booking?.startDate)
            let Difference_In_Time = end.getTime() - start.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if(Difference_In_Days > 0){
                setTotalBill((booking?.Spot?.price * Difference_In_Days) + 100 +((booking?.Spot?.price * Difference_In_Days)/10))
            }else{
                setTotalBill(0)
            }

        }
    },[booking?.endDate,booking?.startDate])


    let today = new Date().toLocaleDateString('en-CA')
    // if(startDate < today || endDate < today){
    return(
        <div className='singlePagebookingContainer'>
                    { !booking?.Spot &&
                    <div className='noSingleSpotAvailableContainer'>
                        <p className='noSpotAvailable'>Booking is no longer available</p></div>}
                   {booking?.Spot && <div className="bookingInfoAndMapContainer">

                        <div className='bookingImageAndInfoContainer'>
                            <div className='bookinImageContainer' onClick={()=>history.push(`/spots/${booking?.Spot?.id}`)}>
                                <img className='bookingImage'  src={booking?.Spot?.previewImage} />
                            </div>
                            <div className='bookingCheckingContainer'>
                                <div className='singleBookingCheckIncontainer'><p className='singleBookingCheckInAndOut'> Check-In </p> <p >{booking?.startDate}</p> </div>

                                <div className='singleBookingCheckOutcontainer'> <p className='singleBookingCheckInAndOut'>Checkout</p><p>{booking?.endDate}</p></div>

                            </div>
                            <div className='bookingInfoContainer'>


                                 <p className='backBtnToSpot' onClick={()=>history.push(`/spots/${booking?.Spot?.id}`)}><i className="fa-solid fa-desktop leftBackIcon"></i>Show Listing</p>
                                 <hr className='line'></hr>
                                 <p className='backBtnToSpot' onClick={()=>history.push(`/bookings`)}><i className="fa-solid fa-arrow-left leftBackIcon"></i>Back to trips</p>
                                 <hr className='line'></hr>
                                 {(booking?.startDate > today) && (booking?.endDate > today) &&
                                 <div><DeleteBookingModal className={"deleteBookingBtn"} booking={booking} />
                                 <hr className='line'></hr></div>}
                                 {(booking?.startDate > today) && (booking?.endDate > today) &&
                                  <div><EditBookingModal className={"editBookingBtn"}  booking={booking} totalBill={totalBill} setTotalBill={setTotalBill}/>
                                 <hr className='line'></hr> </div>}

                           </div>
                           <div className='whrerToGo'>
                                <p className='bookingHeading'>Where to go</p>
                                <hr className='line'></hr>
                                <p><i className="fa-solid fa-umbrella-beach bookingBeachIcon"></i>  {booking?.Spot?.name}</p>


                                <hr className='line'></hr>
                                <p><i className="fa-solid fa-location-dot bookingLocationicon"></i>  {booking?.Spot?.address} {booking?.Spot?.city}
                                {booking?.Spot?.country}</p>

                                <hr className='line'></hr>
                                <p> <i className="fa-solid fa-user bookingBeachIcon"></i>{booking?.Spot?.Owner?.firstName} {booking?.Spot?.Owner?.lastName}</p>
                                 <hr className='line'></hr>
                            </div>
                            <div className='payment'>
                                <p className='bookingHeading'>Payment</p>
                                <hr className='line'></hr>
                                <div className='bookingBtnContainer'>
                                <p><i className="fa-solid fa-dollar-sign bookingDollarIcon"></i>Total:${Math.floor(totalBill)}</p>
                                <hr className='line'></hr>
                            </div>

                            </div>

                        </div>
                        <div className='mapContainer'>

                        <iframe
                            src={`https://www.google.com/maps?q=${booking?.Spot?.lat},${booking?.Spot?.lng}&hl=es;&output=embed`}
                            title={booking?.Spot?.id}
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                        </div>
                    </div>}

        </div>
    )
}

export default SingleBooking
