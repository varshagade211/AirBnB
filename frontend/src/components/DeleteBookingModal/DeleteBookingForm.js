import { useDispatch,useSelector } from "react-redux"

import {deleteBookingThunk} from '../../store/bookings'
import {useState} from 'react'
import './DeleteBookingForm.css'
function DeleteBookingForm({setShowModalClose,booking}){
    let dispatch = useDispatch()
    const [errors, setErrors] = useState({});

    const deleteHandler = async() =>{
        const response= await dispatch(deleteBookingThunk(booking?.id))
        .then((res) => {
            setErrors({});
            setShowModalClose(false)
        })
        .catch(async (res) => {

            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

     }
    return (
        <div className="deleteBookingModalContainer">
            {/* <i onClick={()=>setShowModalClose(false)} className="fa-regular fa-rectangle-xmark "></i> */}

             <i onClick={()=>setShowModalClose(false)} className="fa-solid fa-x cancelBookingCloseIcon"></i>
            <p className="cancelBookingWarning">Do you want to cancel booking permanantly?</p>
            {errors?.date &&
                <div className="errorContainer">
                    <div>
                        <i class="fa-solid fa-circle-exclamation createFormErrorlogo"></i>
                        <span className='createFormErrorError' key={errors.date}>{errors.date}</span>
                    </div>

                </div>
            }
            <div className="cancelBookingBtnContainer">
                 <button  className="cancelBookingBtn" onClick={deleteHandler}>Cancel Booking</button>

            </div>


        </div>

    )
}

export default DeleteBookingForm
