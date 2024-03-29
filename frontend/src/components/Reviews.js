import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import * as reviewActions from '../store/review'
import EditReviewModal from '../components/EditReviewModal'
import DeleteReviewFormModal from '../components/DeleteReviewModal'
import './Reviews.css'
import Footer from "./Footer"
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
        <div className="reviewFeedOuterContainer">
            <div>
                <div className="yourReviewContainer"><p className="pastReview">Past Reviews </p></div>
                {reviews?.length === 0 && <div className='noSingleSpotAvailableContainer'><p> No reviews yet...</p> </div>}
                {reviews?.map(review=>{
                return(
                    <div key={review?.id} className="imageAndReviewContainer">
                    <div className="reviewPreviweImageContainer">
                        <img className='reviewPreviweImage' src={review?.Spot?.Images[0]?.image} />
                    </div>
                    <div className="ReviewBtnAndReviewContainer">
                        <div className="reviewInfoContainer">
                        <p className="reviewInfo reviewSpotName">{review?.Spot?.name}</p>
                        <p className='reviewPageDate reviewInfo'>{new Date(review?.createdAt).toDateString()}</p>
                        <div className="reviewTextContainer">
                            <p className="reviewInfo reviewPageText">{review?.review}</p>
                        </div>
                        <p className="reviewInfo"><i className="fa-solid fa-star"></i> {review?.stars}</p>
                    </div>
                    <div className="editdeletereviewBtnContainer">
                        <EditReviewModal className={'editreviewBtn'} review={review}/>
                        <DeleteReviewFormModal className={'deleteReviewBtn'} reviewId={review?.id}/>
                    </div>
                </div>

                  {/* <button onClick={()=>deleteReviewHandler(review?.id)}>Delete Review</button> */}

                    </div>
                )
                })}

            </div>
            <hr className='line hrLineAllSpot'></hr>
            <Footer />
        </div>
    )
}

export default Reviews
