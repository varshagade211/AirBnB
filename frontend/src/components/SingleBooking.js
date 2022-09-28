import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as bookingActions from '../store/bookings'
import './SingleBooking.css'
import DeleteBookingModal from './DeleteBookingModal'
import EditBookingModal from './EditBookingModal'
function SingleBooking() {
    let dispatch = useDispatch()
    let bookings = useSelector(state => state?.bookings?.bookings)
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

    let today = new Date().toLocaleDateString('en-CA')
    // if(startDate < today || endDate < today){
    return(
        <div className='bookingContainer'>
            {/* <div className="yourBookingsContainer"><p className='yourTripTxt'>Trip in detail</p></div> */}
            {/* {bookings?.map((booking) => { */}
                {/* return ( */}
                    <div key={booking?.id} className="bookingInfoAndMapContainer">
                        <div className='bookingImageAndInfoContainer'>
                            <div className='bookinImageContainer' onClick={()=>history.push(`/spots/${booking?.Spot?.id}`)}>
                                <img className='bookingImage'  src={booking?.Spot?.previewImage} />
                            </div>
                            <div className='bookingCheckingContainer'>
                                <div className='singleBookingCheckIncontainer'><p className='singleBookingCheckInAndOut'> Check-In </p> <p >{booking?.startDate}</p> </div>

                                <div className='singleBookingCheckOutcontainer'> <p className='singleBookingCheckInAndOut'>Checkout</p><p>{booking?.endDate}</p></div>

                            </div>
                            <div className='bookingInfoContainer'>


                                 <p className='backBtnToSpot' onClick={()=>history.push(`/spots/${booking?.Spot?.id}`)}><i class="fa-solid fa-desktop leftBackIcon"></i>Show Listing</p>
                                 <hr className='line'></hr>
                                 <p className='backBtnToSpot' onClick={()=>history.push(`/bookings`)}><i className="fa-solid fa-arrow-left leftBackIcon"></i>Back to trips</p>
                                 <hr className='line'></hr>
                                 {(booking?.startDate > today) && (booking?.endDate > today) &&
                                 <div><DeleteBookingModal className={"deleteBookingBtn"} booking={booking} />
                                 <hr className='line'></hr></div>}
                                 {(booking?.startDate > today) && (booking?.endDate > today) &&
                                  <div><EditBookingModal className={"editBookingBtn"}  booking={booking}/>
                                 <hr className='line'></hr> </div>}

                           </div>
                           <div className='whrerToGo'>
                                <p className='bookingHeading'>Where to go</p>
                                <hr className='line'></hr>
                                <p><i class="fa-solid fa-umbrella-beach bookingBeachIcon"></i>  {booking?.Spot?.name}</p>


                                <hr className='line'></hr>
                                <p><i className="fa-solid fa-location-dot bookingLocationicon"></i>  {booking?.Spot?.address} {booking?.Spot?.city}
                                {booking?.Spot?.country}</p>
                                
                                <hr className='line'></hr>
                                <p> <i class="fa-solid fa-user bookingBeachIcon"></i>{booking?.User?.firstName} {booking?.User?.lastName}</p>
                                 <hr className='line'></hr>
                            </div>
                            <div className='payment'>
                                <p className='bookingHeading'>Payment</p>
                                <hr className='line'></hr>
                                <div className='bookingBtnContainer'>
                                <p><i className="fa-solid fa-dollar-sign bookingDollarIcon"></i>Total:$ 50</p>
                                <hr className='line'></hr>
                            </div>

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
                {/* ) */}
            {/* // })} */}

        </div>
    )
}

export default SingleBooking
