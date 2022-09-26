import { csrfFetch } from "./csrf"

const LOAD_USER_BOOKINGS = 'spots/loadUserBookings';
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


// export const loadUserBookingThunk = ()
