import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/load_spots'




const loadSpots = (spots) => {
   return{
    type:LOAD_SPOTS,
    spots:spots
   }
}


export const loadSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    const spotData = await response.json()
    console.log('thunk spots',spotData)
    dispatch(loadSpots(spotData.Spots))
    return response
}

//--------------------------------------------------------------
const initialSpots = { spots: null}
const spotReducer = (state = initialSpots, action) => {
    let newState
    switch(action.type) {
        case LOAD_SPOTS:{
            console.log('action.spots', action.spots)
           newState= {...state, spots :[...action.spots]}
           return newState
        }
        default:{
            return state
        }

    }
}


export default spotReducer
