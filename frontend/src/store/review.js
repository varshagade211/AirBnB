import { csrfFetch } from "./csrf"

const LOAD_SPOTS_REVIEW = 'spots/loadSpotsReview';
const CREATE_SPOT_REVIEW = 'spots/createSpotReview'
const CURRENT_USER_REVIEWS = 'spots/currentUserReviews'
const DELETE_CURRENT_USER_REVIEW = 'spots/deleteCurrentUserReview'
const EDIT_CURRENT_USER_REVIEW = 'spots/editCurrentUserReview'

// ------------------------------regular action cretor---------------------------------------------------




const loadSpotsReviewActionCreator = (reviews) => {
    return{
     type:LOAD_SPOTS_REVIEW,
     reviews
    }
 }
 const createSpotReviewActionCreator = (review) => {
    return {
        type:CREATE_SPOT_REVIEW,
        review
    }
 }

 const loadCurrentUserReviews = (reviews) => {
    return {
        type:CURRENT_USER_REVIEWS,
        reviews
    }
 }
 const editCurrentUserReviewActionCreator = (review) => {
    return{
        type:EDIT_CURRENT_USER_REVIEW,
        review
    }
 }
 const deleteReviewActionCreator = (reviewId) => {
    return {
        type:DELETE_CURRENT_USER_REVIEW,
        reviewId
    }
 }

 //-----------------------------------------thunk action creator-----------------------------------
export const loadSpotsReviewThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`)
    const data = await response.json()

    dispatch(loadSpotsReviewActionCreator(data.Reviews))

    return response
}

export const loadCurrentUserReviewThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/user`)
    const data = await response.json()

    dispatch(loadCurrentUserReviews(data.Reviews))

    return response
}

export const createReviewThunk = (reviewData) => async (dispatch) => {
    const {review, stars, spotId} = reviewData
    console.log(typeof stars, stars)
        const response = await csrfFetch(`/api/reviews/${spotId}`,
        {
           method:'POST',
           body:JSON.stringify({
              review,stars
           })
       })
       const newReview = await response.json()


       dispatch(createSpotReviewActionCreator(newReview))

       return response;

}


export const editReviewThunk = (reviewData) => async (dispatch) => {
    const {review, stars, id} = reviewData
    const {Spot} = reviewData
    console.log(typeof stars, stars)
        const response = await csrfFetch(`/api/reviews/${id}`,
        {
           method:'PUT',
           body:JSON.stringify({
              review,stars
           })
       })
       const newReview = await response.json()
       newReview.Spot=Spot

       dispatch(editCurrentUserReviewActionCreator(newReview))

       return response;

}


export const deleteReviewThunk = (reviewId) => async (dispatch) => {


        const response = await csrfFetch(`/api/reviews/${reviewId}`,
        {
           method:'DELETE',

       })
       const deletedReview = await response.json()

       if(deletedReview?.statusCode === 200){

           dispatch(deleteReviewActionCreator(reviewId))
       }

       return response;

}

//------------------------------------Reducer--------------------------

const initialReviews = { reviews: [] , userReviews:[]}

const reviewReducer = (state = initialReviews, action) => {
    let newState
    switch(action.type) {
        case LOAD_SPOTS_REVIEW:{
            newState = {...state,reviews:action?.reviews, userReviews:[...state?.userReviews]}
            return newState
        }
        case CURRENT_USER_REVIEWS:{
            newState={...state, userReviews:[...action?.reviews]}
            return newState
        }
        case CREATE_SPOT_REVIEW:{
            newState={...state, reviews:[action?.review,...state?.reviews],userReviews:[...state?.userReviews]}
            return newState
        }
        case EDIT_CURRENT_USER_REVIEW:{
            console.log(action?.review)
            state?.reviews?.forEach((review,i) => {
                console.log(review)
                if(review?.id === action?.review?.id){
                    console.log(review)
                    state?.reviews?.splice(i, 1, action?.review)
                }
            })
            state?.userReviews?.forEach((review,i) => {

                if(review?.id === action?.review?.id){

                    state?.userReviews?.splice(i, 1, action?.review)
                }
            })
            console.log('inside userReview',state?.userReviews)
            newState = {...state,reviews:[...state?.reviews], userReviews:[...state?.userReviews]}
            return newState
        }
        case DELETE_CURRENT_USER_REVIEW:{

            let newreviews = state?.reviews?.filter((review) => review?.id !== action?.reviewId)
            let newuserReviews = state?.userReviews?.filter((review) => review?.id !== action?.reviewId)

            newState = {...state,reviews:newreviews,userReviews:newuserReviews}
            return newState
        }
        default:{
            return state
        }

    }
}


export default reviewReducer
