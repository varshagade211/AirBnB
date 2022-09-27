import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as bookingActions from '../store/bookings'
import './Bookings.css'
import DeleteBookingModal from './DeleteBookingModal'
import EditBookingModal from './EditBookingModal'
function Bookings() {
    let dispatch = useDispatch()
    let bookings = useSelector(state => state?.bookings?.bookings)
    let history = useHistory()
    useEffect(() => {
        dispatch(bookingActions.loadUserBookingThunk())
    },[dispatch])

    return(
        <div className='bookingContainer'>
            <div className="yourBookingsContainer"><p className='yourTripTxt'>Your Trips</p></div>
            {bookings?.map((booking) => {
                return (
                    <div key={booking?.id} className="bookingInfoAndMapContainer">
                        <div className='bookinggImageAndInfoContainer'>
                            <div className='bookinImageContainer' onClick={()=>history.push(`/spots/${booking?.Spot?.id}`)}>
                                <img className='bookingImage'  src={booking?.Spot?.previewImage} />
                            </div>
                            <div className='bookingCheckingContainer'>
                                <div> Check-In  <p>{booking?.startDate}</p> </div>
                                <div> Check-Out<p>{booking?.endDate}</p></div>

                            </div>
                            <div className='bookingInfoContainer'>
                                <p><i class="fa-solid fa-umbrella-beach bookingBeachIcon"></i>  {booking?.Spot?.name}</p>
                                <hr className='line'></hr>
                                <p><i className="fa-solid fa-location-dot bookingLocationicon"></i>  {booking?.Spot?.address} {booking?.Spot?.city}
                                 {booking?.Spot?.country}</p>
                                 <hr className='line'></hr>
                                 <p className='backBtnToSpot' onClick={()=>history.push(`/spots/${booking?.Spot?.id}`)}><i class="fa-solid fa-arrow-left leftBackIcon"></i>Back To Listing</p>
                            </div>

                            <div className='bookingBtnContainer'>
                                <DeleteBookingModal className={"deleteBookingBtn"} booking={booking} />
                                <EditBookingModal className={"editBookingBtn"}  booking={booking}/>
                            </div>
                        </div>
                        <div className='mapContainer'>

                        <iframe
                            src={`https://www.google.com/maps?q=${booking?.Spot?.lat},${booking?.Spot?.lng}&hl=es;&output=embed`}
                            title={booking?.Spot?.id}
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    {/* </div> */}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Bookings
