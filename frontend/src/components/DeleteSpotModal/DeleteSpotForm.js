import { useDispatch,useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {deleteCurrentUserSpotsThunk} from '../../store/spots'
import './DeleteSpotForm.css'
function DeleteSpotForm({setShowModalClose,singleSpot}){
    let dispatch = useDispatch()
    let history = useHistory()

    const deleteHandler = async() =>{
        const response= await dispatch(deleteCurrentUserSpotsThunk(singleSpot))
        history.push('/spots/user/spots')
     }
    return (
        <div className="deleteSpotModalContainer">
            <p className="deleteSpotModalWarningTxt">Do you want to delete listing permanantly?</p>
            <div className="deleteSpotAndCancelBtnContainer">
                <button  className="deleteSpotModalbtn" onClick={deleteHandler}>Delete Listing</button>

                <button className="deleteSpotModalbtn" onClick={()=>setShowModalClose(false)}>Cancel</button>

            </div>
        </div>

    )
}

export default DeleteSpotForm
