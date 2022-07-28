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
          <div className='cancelBtnDeleTxt'>
            <div className='cancelMarkContainer' onClick={() => setShowModal(false)}>
            <i className="fa-solid fa-xmark cancelMark"></i>
          </div>
            <h6 className='deletePopUpQuestion'> Delete this photo? </h6>
          </div>

          <hr className='deletePopupline'></hr>
          <p className='deletePopUpMsg'> Once you delete it, you can't get it back.</p>
          <hr className='deletePopupline'></hr>
          <div className='deleteImagePopUpBtnContainer'>
            <button  onClick={() => setShowModal(false)} className='cancelBtn'>Cancel</button>
          <button className='deleteImagePopUpBtn' onClick={deleteHandler}>Delete it</button>
          </div>

        </div>
  )
}

export default DeletePopUp;
