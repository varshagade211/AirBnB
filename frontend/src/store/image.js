import { csrfFetch } from "./csrf"

//  const LOAD_IMAGE = '/loadImage';
const CREATE_IMAGE = 'image/createImage'
const DELETE_IMAGE = 'image/deleteImage'


const createImageActionCreator = (image) => {
    return{
        type:CREATE_IMAGE,
        image
    }
}

const deleteImagesActionCreator = (imageId) => {
    return{
        type:DELETE_IMAGE,
        imageId
    }
}




export const createImageThunk = (id,url) => async (dispatch) => {
    
        const response = await csrfFetch(`/api/images/spot/${id}`,
        {
           method:'POST',
           body:JSON.stringify({
              url
           })
       })
       const newImage = await response.json()

       dispatch(createImageActionCreator(newImage))
    //    if(newSpot) {
    //     return newSpot
    //    }
       return response;

}


export const deleteImageThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`,
    {
        method:'DELETE',
    })
    await response.json()
    dispatch(deleteImagesActionCreator(id))
    return response;
}


const initialImages = { images: []}
const ImageReducer = (state = initialImages, action) => {
    let newState
    switch(action.type) {

        case CREATE_IMAGE:{
            if(state.images.length){
                newState = {...state,images:[...state.images, action.image]}
            } else {
                newState = {images:[action.image]}
            }
            newState[action?.image?.id] = action?.image
            return newState;
        }
        case DELETE_IMAGE:{
            delete state[action.imageId]
            newState = {...state}
            const images = []
            for (let i=0; i<state.images.length; i++){
                if(action.imageId !== state.images[i].id){
                    images.push(state.images[i])
                }
            }
          newState.images=images
          return newState

        }
        default:{
            return state
        }

    }
}


export default ImageReducer
