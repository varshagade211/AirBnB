import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import * as bookingActions from '../store/bookings'
// import EditReviewModal from '../components/EditReviewModal'
// import DeleteReviewFormModal from '../components/DeleteReviewModal'
import { useHistory } from 'react-router-dom'
import './Bookings.css'
function Booking(){
    let dispatch = useDispatch()
    let bookings = useSelector(state => state?.bookings?.bookings)
    let history = useHistory()
    useEffect(() => {
        dispatch(bookingActions.loadUserBookingThunk())
    },[dispatch])

    return (
        <div className="bookingContainer">
        <div className="yourTripsContainer"><p className="trips">Where you’ve been</p></div>
        <div className="tripsFeedOuterContainer">
            {bookings?.length === 0 &&  <div className='noSingleSpotAvailableContainer'><p>No trips yet...</p> </div>}
            {bookings?.map(booking=>{
               return(
                <div key={booking?.id} className="imageAndTripsContainer" onClick={()=>history.push(`/singleBooking/${booking?.id}`)}>
                    <div className="tripsPreviweImageContainer" >
                        <img className='tripPreviweImage' src={booking?.Spot?.previewImage} />
                    </div>
                    <div className="tripBtnAndTripContainer">
                        <div className="tripInfoContainer">
                        <p className="tripInfo tripSpotName">{booking?.Spot?.name}</p>
                        <p className=' tripInfo tripSpotAddress'>  {booking?.Spot?.address} {booking?.Spot?.city}</p>
                        <p className='tripPageDate tripInfo'>{new Date(booking?.createdAt).toDateString()}</p>

                        <div className="checkingContainer">
                            {/* <p className="reviewInfo reviewPageText">{review?.review}</p> */}
                            {/* <div className='bookingCheckingContainer'> */}
                                {/* <div><p className="checkInAndOut"> Check-In : {booking?.startDate}</p> </div>
                                <div><p  className="checkInAndOut"> Check-Out: {booking?.endDate}</p></div> */}

                            {/* </div> */}
                        </div>
                    </div>

                </div>


            </div>
             )
        })}
        </div>
        </div>
    )
}

export default Booking
