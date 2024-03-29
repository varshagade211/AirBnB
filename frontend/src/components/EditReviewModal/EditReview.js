import './EditReview.css'
import {useRef, useState,useEffect} from 'react'
import * as reviewActions from '../../store/review'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
function EditReviewForm({setShowModalClose , review}){
    const [reviewData, setReview] = useState(review?.review)
    const [errors,setErrors] = useState({})
    const [firstStar, setFirstStar] =useState(review?.stars >= 1 ? true : false)
    const [secondStar, setSecondeStar] =useState(review?.stars >= 2 ? true : false)
    const [thirdStar, setThirdStar] =useState(review?.stars >= 3 ? true : false)
    const [fourthStar, setFourthStar] =useState(review?.stars >= 4 ? true : false)
    const [fifthStar, setFifthStar] = useState(review?.stars >= 5 ? true : false)
    const [starCount, setStarCount] = useState(review?.stars)
    const {id} = useParams()
    const textArea = useRef(null)
    const dispatch = useDispatch()


    const onCommentChangeHandler = (e) =>{
        if(e.target.value.length>255){
            setErrors({...errors,'review':'Review must be 1-255 characters'});

        }if(errors.review){
            delete errors.review
        }
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        setReview(e.target.value)

    }
    useEffect(()=>{
        // if(isEdit){

            textArea.current.style.height = 'auto'
            textArea.current.style.height = textArea.current.scrollHeight + 'px'
        // }
    },[])
    const firstStarHandler = () => {
        setFirstStar(true)

        setSecondeStar(false)
        setThirdStar(false)
        setFourthStar(false)
        setFifthStar(false)
        setStarCount(1)

    }

    const secondStarHandler = () => {
        setFirstStar(true)
        setSecondeStar(true)

        setThirdStar(false)
        setFourthStar(false)
        setFifthStar(false)
        setStarCount(2)
    }

    const thirdStarHandler = () => {
        setFirstStar(true)
        setSecondeStar(true)
        setThirdStar(true)

        setFourthStar(false)
        setFifthStar(false)
        setStarCount(3)
    }

    const fourthStarHandler = () => {
        setFirstStar(true)
        setSecondeStar(true)
        setThirdStar(true)
        setFourthStar(true)

        setFifthStar(false)
        setStarCount(4)
    }

    const fifthStarHandler = () => {
        setFirstStar(true)
        setSecondeStar(true)
        setThirdStar(true)
        setFourthStar(true)
        setFifthStar(true)
        setStarCount(5)
    }

    const onSubmitReviewHandler = (e) => {
        e.preventDefault();


        dispatch(reviewActions.editReviewThunk({review:reviewData,stars:starCount,spotId:id, id:review?.id, Spot:review?.Spot}))
        .then((res) => {
            setReview("");
            textArea.current.style.height = 2 +"rem"
            if(res.status === 200){
                setShowModalClose(false)
                setErrors({})
            }
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };
    return (
        <div className='editReviewFormContainer'>

        <form className='editReviewForm' onSubmit={onSubmitReviewHandler}>
            <textarea className='editReviewInput' ref={textArea}  type='text' placeholder="Add review" name='review' value={reviewData} onChange={onCommentChangeHandler}/>
            {errors?.review &&
                <div>
                    <div>
                        <i className="fa-solid fa-circle-exclamation createReviewErrorlogo"></i>
                        <span className='createReviewErrorError' key={errors.review}>{errors.review}</span>
                    </div>
                    </div>
            }

            <div className='starContainer'>
            { !firstStar &&<i className="fa-regular fa-star editReviewStar" onClick={firstStarHandler}></i>}
            {firstStar &&<i className="fa-solid fa-star editSelectedStar" onClick={firstStarHandler} ></i>}

            {!secondStar && <i className="fa-regular fa-star editReviewStar"  onClick={secondStarHandler}></i>}
            {secondStar && <i className="fa-solid fa-star editSelectedStar" onClick={secondStarHandler}></i>}

            {! thirdStar && <i className="fa-regular fa-star editReviewStar"  onClick={thirdStarHandler}></i>}
            {thirdStar && <i className="fa-solid fa-star editSelectedStar" onClick={thirdStarHandler} ></i>}

            { !fourthStar && <i className="fa-regular fa-star editReviewStar"  onClick={fourthStarHandler}></i>}
            {fourthStar && <i className="fa-solid fa-star editSelectedStar" onClick={fourthStarHandler}></i>}

            {!fifthStar && <i className="fa-regular fa-star editReviewStar"  onClick={fifthStarHandler}></i>}
            {fifthStar && <i className="fa-solid fa-star editSelectedStar" onClick={fifthStarHandler}></i>}

            </div>
            {errors?.stars &&
                <div>
                    <div>
                        <i className="fa-solid fa-circle-exclamation createReviewErrorlogo"></i>
                        <span className='createReviewErrorError' key={errors.stars}>{errors.stars}</span>
                    </div>
                    </div>
            }
            {errors?.message &&
                <div>
                    <div>
                        <i className="fa-solid fa-circle-exclamation createReviewErrorlogo"></i>
                        <span className='createReviewErrorError' key={errors.message}>{errors.message}</span>
                    </div>
                    </div>
            }

            <button className='editReviewSubmitBtn'>Save</button>

        </form>
        </div>
    )
}


export default EditReviewForm;
