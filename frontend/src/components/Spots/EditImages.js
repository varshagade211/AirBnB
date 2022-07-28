
import {useParams , useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState,useCallback } from 'react'
import {loadSpotsThunk} from '../../store/spots'
import DeletePopUpModal from '../ImageDeleteModal/index.js'
import AddImagesFormModal from '../AddImages/index.js'

import './EditImage.css'
import { loadAllImageThunkCreator } from '../../store/image'

function EditImages(){
    let {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const spots = useSelector(state => state?.spots)
    const images = useSelector(state => state?.image)
    const sessionUser = useSelector(state => state?.session?.user);

    useEffect(()=>{
        dispatch(loadSpotsThunk())
        dispatch(loadAllImageThunkCreator())
    },[dispatch])

    let singleSpot
    let editImages
    const imagesFromImageTable = []
    if(spots) {
        singleSpot = spots[id]
        editImages = singleSpot?.Images
        // let isOwner = false
        // if(sessionUser?.id === singleSpot?.ownerId) isOwner = true
        // if(!isOwner) history.push('/')
        if (images) {
            for(let key in images) {
                id = +id
                if(images[key]?.imageableId === id){
                    imagesFromImageTable.push(images[key])
                }
            }
        }
    }

    const backHandler = () => {
      history.goBack()
    }

    return(
        <div>
            <div  className = 'editImageBackIconContainer' onClick={backHandler}>
              <i  className="fas fa-angle-left editImagesBackarrowIcon"></i>
            </div>
           <div className='editImageContainerOuterContainer'>

              {imagesFromImageTable?.map((img)=>{
               return(<DeletePopUpModal key={img?.id} ImageId={img?.id} image={img?.url} />)}
                )}
                   <AddImagesFormModal />
            </div>

        </div>
    )
}

export default EditImages
