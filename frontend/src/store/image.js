import { csrfFetch } from "./csrf"

//  const LOAD_IMAGE = '/loadImage';
const CREATE_IMAGE = 'image/createImage'

// const loadImageActionCreator = (images) => {
//     return{
//      type:LOAD_IMAGE,
//     images
//     }
//  }

const createImageActionCreator = (image) => {
    return{
        type:CREATE_IMAGE,
        image
    }
}


// export const loadImageThunk = () => async (dispatch) => {
//     const response = await csrfFetch('/api/spots')
//     const spotData = await response.json()

//     dispatch(loadSpotsActionCreator(spotData.Spots))
//     return response
// }

export const createImageThunk = (spot) => async (dispatch) => {
    const {id,url} = spot

        const response = await csrfFetch(`/api/images/spot/${id}`,
        {
           method:'POST',
           body:JSON.stringify({
              url
           })
       })
       const newImage = await response.json()
    //    console.log('thunk',newSpot)

       dispatch(createImageActionCreator(newImage))
    //    if(newSpot) {
    //     return newSpot
    //    }
       return response;

}


const initialImages = { images: []}
const ImageReducer = (state = initialImages, action) => {
    let newState
    switch(action.type) {
        // case LOAD_IMAGE:{

        //    newState= {...state, images :[...action?.images]}
        //    action?.images?.forEach(image => {
        //       newState[action?.images?.id] = image
        //    });
        //    return newState;
        // }
        case CREATE_IMAGE:{
            if(state.images.length){
                newState = {...state,images:[...state.images, action.image]}
            } else {
                newState = {images:[action.image]}
            }
            newState[action?.image?.id] = action?.image
            return newState;
        }
        default:{
            return state
        }

    }
}


export default ImageReducer
