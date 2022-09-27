import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as bookingActions from '../store/bookings'
import './Bookings.css'
import DeleteBookingModal from './DeleteBookingModal'
import EditBookingModal from './EditBookingModal'
function Bookings() {
    let dispatch = useDispatch()
    let bookings = useSelector(state => state?.bookings?.bookings)
    console.log(bookings)
    useEffect(() => {
        dispatch(bookingActions.loadUserBookingThunk())
    },[dispatch])

    return(
        <div>
            <div className="yourBookingsContainer"><p>Your Trips</p></div>
            {bookings?.map((booking) => {
                return (
                    <div key={booking?.id}>
                        <div>
                            <img  style={{ width: 100, }} src={booking?.Spot?.previewImage} />
                            <p>{booking?.Spot?.name}</p>
                            <p>{booking?.Spot?.address} {booking?.Spot?.city} {booking?.Spot?.country}</p>
                        </div>
                        <div>
                            <p>{booking?.startDate} To {booking?.endDate}</p>

                        </div>
                        <div>
                           <DeleteBookingModal booking={booking} />
                           <EditBookingModal booking={booking}/>
                        </div>
                        <div>
                        {/* {console.log(booking?.Spot?.lng,booking?.Spot?.lat)} */}
                        {/* <iframe src={`https://www.google.com/maps?q=${booking?.Spot?.lng},${booking?.Spot?.lat}&hl=es;&output=embed`}
                        ></iframe> */}
                    {/* <div> */}
                        <iframe
                            src={`https://www.google.com/maps?q=${booking?.Spot?.lat},${booking?.Spot?.lng}&hl=es;&output=embed`}
                            title={booking?.Spot?.id}
                            width="50%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    {/* </div> */}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Bookings
