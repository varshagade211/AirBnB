import { useDispatch,useSelector } from "react-redux"

import {deleteBookingThunk} from '../../store/bookings'
import {useState} from 'react'
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
        <div>
            <i onClick={()=>setShowModalClose(false)} className="fa-regular fa-rectangle-xmark"></i>
            <p>Do you want to delete booking permanantly?</p>
            {errors?.date &&
                <div className="errorContainer">
                    <div>
                        <i class="fa-solid fa-circle-exclamation createFormErrorlogo"></i>
                        <span className='createFormErrorError' key={errors.date}>{errors.date}</span>
                    </div>

                </div>
            }
           <button   onClick={deleteHandler}>Cancel Booking</button>


        </div>

    )
}

export default DeleteBookingForm
