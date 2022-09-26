import { csrfFetch } from "./csrf"

const LOAD_USER_BOOKINGS = 'bookings/loadUserBookings';
// const CREATE_SPOT_REVIEW = 'spots/createSpotReview'
// const CURRENT_USER_REVIEWS = 'spots/currentUserReviews'
// const DELETE_CURRENT_USER_REVIEW = 'spots/deleteCurrentUserReview'
// const EDIT_CURRENT_USER_REVIEW = 'spots/editCurrentUserReview'

// ------------------------------regular action cretor---------------------------------------------------

const loadUserBookingActionCreator = (bookings) => {
    return{
        type:LOAD_USER_BOOKINGS,
        bookings
    }
}

// ------------------------------Thunk action cretor---------------------------------------------------
export const loadUserBookingThunk = () => async(dispatch) => {
    const response = await csrfFetch(`/api/bookings/`)
    const data = await response.json()

    dispatch(loadUserBookingActionCreator(data.Bookings))

    return response

}

// ------------------------------Reducer---------------------------------------------------

const initialReviews = { bookings: [] }

const bookingReducer = (state = initialReviews, action) => {
    let newState
    switch(action.type) {
        case LOAD_USER_BOOKINGS:{
            newState = {...state, bookings:[...action?.bookings]}
            return newState
        }
        default:{
            return state
        }

    }
}


export default bookingReducer
