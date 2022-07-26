import './DeletePopUp.css'
import {deleteImageThunk} from '../../store/image'
import {useDispatch,useSelector} from 'react-redux'



function DeletePopUp ({ImageId,setRefresh, setShowModal}) {
  const dispatch = useDispatch()
  const deleteHandler = () => {
    dispatch(deleteImageThunk(ImageId))
    setShowModal(false)
   
  }


  return(
        <div className='deletePopup'>
          Are you sure!
          <button onClick={deleteHandler}>delete</button>
        </div>
  )
}

export default DeletePopUp;
