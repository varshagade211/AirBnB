import { useDispatch,useSelector } from "react-redux"
import * as reviewActions from '../../store/review'

function DeleteReviewForm({setShowModalClose,reviewId}){
    let dispatch = useDispatch()


    const deleteReviewHandler = () =>{
        dispatch(reviewActions.deleteReviewThunk(reviewId))
    }
    return (
        <div>
            <p>Do You Want To Delete Review Permanantly?</p>
            <button onClick={deleteReviewHandler}>Delete</button>
            <button onClick={()=>setShowModalClose(false)}>Cancel</button>
        </div>

    )
}

export default DeleteReviewForm
