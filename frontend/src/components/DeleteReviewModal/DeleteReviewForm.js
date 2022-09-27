import { useDispatch,useSelector } from "react-redux"
import * as reviewActions from '../../store/review'
import './DeleteReviewForm.css'
function DeleteReviewForm({setShowModalClose,reviewId}){
    let dispatch = useDispatch()


    const deleteReviewHandler = () =>{
        dispatch(reviewActions.deleteReviewThunk(reviewId))
    }
    return (
        <div className="deleteReviewContainer">
            <p className="deleteReviewWarning">Do You Want To Delete Review Permanantly?</p>
           <div className="cancelDeleteReviewModalBtnContainer">
            <button className="deleteReviewModalBtn" onClick={deleteReviewHandler}>Delete</button>
            <button className='cancelReviewModalBtn' onClick={()=>setShowModalClose(false)}>Cancel</button>
           </div>
        </div>

    )
}

export default DeleteReviewForm
