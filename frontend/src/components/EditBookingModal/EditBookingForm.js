import {useState,useEffect} from "react"
import { useDispatch } from "react-redux";
import {editBookingThunk} from '../../store/bookings'
import './EditBookingForm.css'
function EditBookingForm({setShowModalClose, booking, setTotalBill,totalBill}){
    let [startDate,setStartDate] = useState(booking?.startDate)
    let [endDate, setEndDate] = useState(booking?.endDate)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const [diffrenceInDate, setDiffrenceInDate] = useState(0)
    const [totalFeesByDay, setTotalFeesByDays] = useState(0)
    // const [totalBill, setTotalBill] = useState(0)
    const [serviceFees, setServiceFees] = useState(0)

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
    useEffect(()=>{
        if(endDate && startDate){
            let end = new Date(endDate)
            let start = new Date( startDate)
            let Difference_In_Time = end.getTime() - start.getTime();
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if(Difference_In_Days > 0){
                setDiffrenceInDate(Difference_In_Days)
                setTotalFeesByDays(booking?.Spot?.price * Difference_In_Days)
                setTotalBill(booking?.Spot?.price * Difference_In_Days+ 100 +booking?.Spot?.price * Difference_In_Days/10)
                setServiceFees(booking?.Spot?.price * Difference_In_Days/10)
            }else{
                setDiffrenceInDate(0)
                setTotalFeesByDays(0)
                setTotalBill(0)
                setServiceFees(0)
            }

        }
    },[startDate,endDate])

return(
    <form className="editBookingForm" onSubmit={onBookingSubmit}>
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
    <div className='billingContainer'>
        <p className='youWontBeChargeTxt'>You won't be charged yet</p>
        <div className='calculationContainer'>
            <p className='billingInfo'>${booking?.Spot?.price} x {diffrenceInDate} night</p>
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
)
}

export default EditBookingForm
