import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as bookingActions from '../store/bookings'
import './Bookings.css'

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
                    </div>
                )
            })}

        </div>
    )
}

export default Bookings
