import {useState} from "react"
import { useDispatch } from "react-redux";
import {editBookingThunk} from '../../store/bookings'
function EditBookingForm({setShowModalClose, booking}){
    let [startDate,setStartDate] = useState(booking?.startDate)
    let [endDate, setEndDate] = useState(booking?.endDate)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()

    const onBookingSubmit = (e) => {
        e.preventDefault()
        dispatch(editBookingThunk({spot:booking?.Spot,startDate,endDate,id:booking?.id}))
        .then((res) => {
            setStartDate("");
            setEndDate("")
            setShowModalClose(false)
        })
        .catch(async (res) => {
            console.log(res)
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    }

return(
    <form onSubmit={onBookingSubmit}>
    <div className='dateInputLabelContainer'>
        <label className='dateLable' htmlFor="checkIn">Check In</label><br />
        <input className='dateInput' type="date" name="checkIn" id="checkIn" value={startDate}
        onChange={(e)=>setStartDate(e.target.value)}/>
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
        <input className='dateInput' type="date" name="checkOut" id="checkOut" value={endDate}
        onChange={(e)=>setEndDate(e.target.value)} />
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
    </div>
    <div className='dateInputLabelContainer'>
        <button className='bookingBtn'>Reserve</button>
    </div>
</form>
)
}

export default EditBookingForm
