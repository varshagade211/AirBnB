import { useDispatch,useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {deleteCurrentUserSpotsThunk} from '../../store/spots'

function DeleteSpotForm({setShowModalClose,singleSpot}){
    let dispatch = useDispatch()
    let history = useHistory()

    const deleteHandler = async() =>{
        const response= await dispatch(deleteCurrentUserSpotsThunk(singleSpot))
        history.push('/spots/user/spots')
     }
    return (
        <div>
            <p>Do you want to delete listing permanantly?</p>
          <button   onClick={deleteHandler}>Delete Listing</button>

            <button onClick={()=>setShowModalClose(false)}>Cancel</button>
        </div>

    )
}

export default DeleteSpotForm
