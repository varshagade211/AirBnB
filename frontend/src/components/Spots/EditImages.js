
import {useParams , useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import {loadSpotsThunk} from '../../store/spots'
import DeletePopUpModal from '../ImageDeleteModal/index.js'
import AddImagesFormModal from '../AddImages/index.js'

import './EditImage.css'

function EditImages(){
    let {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const spots = useSelector(state => state?.spots)

    // const sessionUser = useSelector(state => state?.session?.user);
    useEffect(()=>{
        dispatch(loadSpotsThunk())
    },[dispatch])

    let singleSpot
    let editImages
    if(spots) {
        singleSpot = spots[id]
        editImages = singleSpot?.Images
        // let isOwner = false
        // if(sessionUser?.id === singleSpot?.ownerId) isOwner = true
        // if(!isOwner) history.push('/')
    }

    return(
        <div>
           <div className='editImageContainerOuterContainer'>
              {editImages?.map((img)=>{
               return(<DeletePopUpModal key={img?.id} ImageId={img?.id} image={img?.image} />)}
                )}
            </div>
            <AddImagesFormModal/>

        </div>
    )
}

export default EditImages
