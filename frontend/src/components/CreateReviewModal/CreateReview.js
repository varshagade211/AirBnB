import './CreateReview.css'
import {useRef, useState} from 'react'
import * as reviewActions from '../../store/review'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
function CreateReviewForm({setShowModalClose}){
    const [reviewData, setReview] = useState('')
    const [errors,setErrors] = useState({})
    const [firstStar, setFirstStar] =useState(false)
    const [secondStar, setSecondeStar] =useState(false)
    const [thirdStar, setThirdStar] =useState(false)
    const [fourthStar, setFourthStar] =useState(false)
    const [fifthStar, setFifthStar] = useState(false)
    const [starCount, setStarCount] = useState(0)
    const {id} = useParams()
    const textArea = useRef(null)
    const dispatch = useDispatch()


    const onCommentChangeHandler = (e) =>{
        if(e.target.value.length>1000){
            setErrors({...errors,'review':'review must be less than 1000 characters'});

        }if(errors.review){
            delete errors.review
        }
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        setReview(e.target.value)

    }
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


        dispatch(reviewActions.createReviewThunk({review:reviewData,stars:starCount,spotId:id}))
        .then((res) => {
            setReview("");
            textArea.current.style.height = 2 +"rem"
            if(res.status === 201){
                setShowModalClose(false)
                setErrors({})
            }
        })
        .catch(async (res) => {

            console.log(res)
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };
    return (
        <div className='reviewFormContainer'>

        <form className='reviewForm' onSubmit={onSubmitReviewHandler}>
            <textarea className='reviewInput' ref={textArea}  type='text' placeholder="Add review" name='review' value={reviewData} onChange={onCommentChangeHandler}/>
            {errors?.review &&
                <div className="errorContainer">
                    <div>
                        <i class="fa-solid fa-circle-exclamation commentErrorlogo"></i>
                        <span className='commentError' key={errors.review}>{errors.review}</span>
                    </div>
                    </div>
            }

            <div className='starContainer'>
            { !firstStar &&<i class="fa-regular fa-star reviewStar" onClick={firstStarHandler}></i>}
            {firstStar &&<i class="fa-solid fa-star selectedStar" onClick={firstStarHandler} ></i>}

            {!secondStar && <i class="fa-regular fa-star reviewStar"  onClick={secondStarHandler}></i>}
            {secondStar && <i class="fa-solid fa-star selectedStar" onClick={secondStarHandler}></i>}

            {! thirdStar && <i class="fa-regular fa-star reviewStar"  onClick={thirdStarHandler}></i>}
            {thirdStar && <i class="fa-solid fa-star selectedStar" onClick={thirdStarHandler} ></i>}

            { !fourthStar && <i class="fa-regular fa-star reviewStar"  onClick={fourthStarHandler}></i>}
            {fourthStar && <i class="fa-solid fa-star selectedStar" onClick={fourthStarHandler}></i>}

            {!fifthStar && <i class="fa-regular fa-star reviewStar"  onClick={fifthStarHandler}></i>}
            {fifthStar && <i class="fa-solid fa-star selectedStar" onClick={fifthStarHandler}></i>}

            </div>
            {errors?.stars &&
                <div className="errorContainer">
                    <div>
                        <i class="fa-solid fa-circle-exclamation commentErrorlogo"></i>
                        <span className='commentError' key={errors.stars}>{errors.stars}</span>
                    </div>
                    </div>
            }


            <button className='reviewSubmitBtn'> Add Review</button>

        </form>
        </div>
    )
}


export default CreateReviewForm;
