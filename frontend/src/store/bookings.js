import { csrfFetch } from "./csrf"

const LOAD_USER_BOOKINGS = 'bookings/loadUserBookings';
const CREATE_SPOT_BOOKING = 'bookings/createSpotBooking'
// const CURRENT_USER_REVIEWS = 'spots/currentUserReviews'
const DELETE_USER_BOOKING = 'spots/deleteCurrentUserBooking'
const EDIT_CURRENT_USER_BOOKING= 'spots/editCurrentUserBooking'

// ------------------------------regular action cretor---------------------------------------------------

const loadUserBookingActionCreator = (bookings) => {
    return{
        type:LOAD_USER_BOOKINGS,
        bookings
    }
}
const createSpotBookingActionCreator = (booking) => {
    return{
        type:CREATE_SPOT_BOOKING,
        booking
    }
}

const editCurrentUserBookingActionCreator = (booking) => {
    return{
        type:EDIT_CURRENT_USER_BOOKING,
        booking
    }
 }
const deleteSpotBookingActionCreator = (bookingId) => {
    return{
        type:DELETE_USER_BOOKING,
        bookingId
    }
}
// ------------------------------Thunk action cretor---------------------------------------------------
export const loadUserBookingThunk = () => async(dispatch) => {
    const response = await csrfFetch(`/api/bookings/`)
    const data = await response.json()

    dispatch(loadUserBookingActionCreator(data.Bookings))

    return response

}

export const createBookingThunk = (bookingData) => async(dispatch) => {
    const {startDate, endDate, spotId} = bookingData
    const response = await csrfFetch(`/api/bookings/${spotId}`,
    {
        method:'POST',
        body:JSON.stringify({
           startDate,endDate
        })
    })
    const newBooking = await response.json()
    dispatch(createSpotBookingActionCreator(newBooking))

    return response;
}
export const editBookingThunk = (bookingData) => async (dispatch) => {
    const {startDate, endDate, spot, id} = bookingData

        const response = await csrfFetch(`/api/bookings/${id}`,
        {
           method:'PUT',
           body:JSON.stringify({
            startDate,endDate
           })
       })
       const updatedBooking = await response.json()
       updatedBooking.Spot=spot

       dispatch(editCurrentUserBookingActionCreator(updatedBooking))

       return response;

}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {


    const response = await csrfFetch(`/api/bookings/${bookingId}`,
    {
       method:'DELETE',

   })
   const deletedReview = await response.json()

   if(deletedReview?.statusCode === 200){

       dispatch(deleteSpotBookingActionCreator(bookingId))
   }

   return response;

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
        case CREATE_SPOT_BOOKING:{
            newState =  {...state, bookings:[action?.bookings, ...state?.bookings]}
        }

        case EDIT_CURRENT_USER_BOOKING:{
            state?.bookings?.forEach((booking,i) => {
                if(booking?.id === action?.booking?.id){
                   state?.bookings?.splice(i, 1,  action?.booking)
                }
            })
            newState = {...state, bookings:[...state?.bookings]}
            return newState
        }
        case DELETE_USER_BOOKING:{

            let newBookings = state?.bookings?.filter((booking) => booking?.id !== action?.bookingId)
            newState = {...state,bookings:newBookings}
            return newState
        }
        default:{
            return state
        }

    }
}


export default bookingReducer
