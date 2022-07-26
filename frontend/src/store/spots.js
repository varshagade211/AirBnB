import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots';
const CREATE_SPOTS = 'spots/createSpot'
const CURRENT_USER_SPOT = 'spots/currentUserSpots'
const DELETE_CURRENT_USER_SPOT = 'spots/deleteCurrentUserSpot'
const EDIT_SPOT_CURRENT_USER = 'spots/editSpotCurrentUserr'
// ------------------------------regular action cretor---------------------------------------------------

const loadSpotsActionCreator = (spots) => {
   return{
    type:LOAD_SPOTS,
    spots:spots
   }
}
const createSpotActionCreator = (spot) => {
    return{
        type:CREATE_SPOTS,
        spot
    }
}
const currentUserSpotsActionCreator = (spots) => {
    return{
        type: CURRENT_USER_SPOT,
        spots
    }
}

const deleteCurrentUserSpot=(spotId) => {
   return{
     type:DELETE_CURRENT_USER_SPOT,
     spotId
   }
}
const editSpotActionCreator = (updateSpot) => {
   return{
    type:EDIT_SPOT_CURRENT_USER,
    updateSpot
   }
}
//-----------------------------------------thunk action creator-----------------------------------
export const loadSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    const spotData = await response.json()
    dispatch(loadSpotsActionCreator(spotData.Spots))

    return response
}

export const loadCurrentUserSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/user/spots')
    const spotData = await response.json()

    dispatch(currentUserSpotsActionCreator(spotData.Spots))
    return response
}

export const createSpotThunk = (spot) => async (dispatch) => {
    const {address, city, state, country,lat,lng,name,description,price} = spot

        const response = await csrfFetch('/api/spots',
        {
           method:'POST',
           body:JSON.stringify({
              address,city,state,country,lat,lng,name,description,price
           })
       })
       const newSpot = await response.json()


       dispatch(createSpotActionCreator(newSpot))
       if(newSpot) {
        return newSpot
       }
       return response;

}
export const editSpotThunk = (spot) => async (dispatch) => {
    const {id,address, city, state, country,lat,lng,name,description,price} = spot

        const response = await csrfFetch(`/api/spots/${id}`,
        {
           method:'PUT',
           body:JSON.stringify({
              address,city,state,country,lat,lng,name,description,price
           })
       })
       const newSpot = await response.json()


       dispatch(editSpotActionCreator(newSpot))
       if(newSpot) {
           return newSpot
       }
       return response;

}

export const deleteCurrentUserSpotsThunk = (spot) => async (dispatch) => {
    const {id} = spot
    const response = await csrfFetch(`/api/spots/${id}`,{
        method:'DELETE',

    })
    const spotData = await response.json()
    dispatch(deleteCurrentUserSpot(id))

    return response
}

//------------------------------------Reducer--------------------------
// const initialSpots = { spots: null , userSpot:null}
const initialSpots = { spots: [] , userSpot:[]}
const spotReducer = (state = initialSpots, action) => {
    let newState
    switch(action.type) {
        case LOAD_SPOTS:{

            // newState = {...state, spots : [...action?.spots]}
            // action?.spots?.forEach(spot => {
            //     newState[spot?.id] = spot
            // });
            // return newState

            newState = {...state, userSpot : [...state?.userSpot], spots : [...action?.spots]}
            action?.spots?.forEach(spot => {
                newState[spot?.id] = spot
            });
            return newState
        }
        case CURRENT_USER_SPOT:{
            // newState = {...state, userSpot : [...action?.spots]}
            // action?.spots?.forEach(spot => {
            //     newState[spot?.id] = spot
            // });
            // return newState
            newState = {...state, spots : [...state?.spots], userSpot : [...action?.spots]}
            action?.spots?.forEach(spot => {
                newState[spot?.id] = spot
            });
            return newState
        }
        case CREATE_SPOTS:{
            // if (state.spots) {
            //     newState = {...state, spots:[...state.spots, action.spot]}
            // } else {
            //     newState = {...state, spots:[action.spot]}
            // }
            // newState[action?.spot?.id] = action?.spot
            // return newState;
            //new Try
            newState = {...state, spots:[...state?.spots, action.spot] , userSpot:[...state?.userSpot, action.spot]}
            newState[action?.spot?.id] = action?.spot
            return newState;
        }
        case DELETE_CURRENT_USER_SPOT:{
            // delete state[action?.spotId]
            // return state
             // new try
            delete state[action?.spotId]
            newState={...state, spots:[...state?.spots], userSpot: [...state?.userSpot]}
            return newState
        }
        case EDIT_SPOT_CURRENT_USER:{
            //  state[action?.updateSpot?.id]=action?.updateSpot
            //  return state
            newState={...state,spots:[...state?.spots], userSpot:[...state?.userSpot]}
            newState[action?.updateSpot?.id]=action?.updateSpot
            return newState
        }
        default:{
            return state
        }

    }
}


export default spotReducer
