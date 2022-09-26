import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import * as reviewActions from '../store/review'
import EditReviewModal from '../components/EditReviewModal'
import DeleteReviewFormModal from '../components/DeleteReviewModal'
import './Reviews.css'
function Reviews(){
    let dispatch = useDispatch()
    let user = useSelector(state => state?.session?.user)
    const reviews = useSelector(state => state?.reviews?.userReviews)
    useEffect(()=>{
        dispatch(reviewActions.loadCurrentUserReviewThunk())
    },[])
    // const deleteReviewHandler = (reviewId) =>{
    //     dispatch(reviewActions.deleteReviewThunk(reviewId))
    // }
    return (
        <div>
            <div className="yourReviewContainer"><p>Your Review</p></div>
            {reviews?.map(review=>{
               return(
                <div key={review?.id}>
                    <div className="reviewPreviweImageContainer">
                        <img className='reviewPreviweImage' src={review?.Spot?.Images[0]?.image} />
                    </div>

                  <p>{review?.Spot?.name}</p>
                  <p>{review?.review}</p>
                  <p><i class="fa-solid fa-star"></i> {review?.stars}</p>
                  <p className='reviewDate'>{new Date(review?.createdAt).toDateString()}</p>
                  <EditReviewModal review={review}/>
                  <DeleteReviewFormModal reviewId={review?.id}/>
                  {/* <button onClick={()=>deleteReviewHandler(review?.id)}>Delete Review</button> */}
                </div>
             )
        })}
        </div>
    )
}

export default Reviews
