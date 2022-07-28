import { useState } from "react"
import { useParams } from "react-router-dom"
import {createImageThunk} from '../../store/image'
import {useDispatch} from 'react-redux'
import './AddImages.css'
function AddImages({setShowModal}) {
    const [image,setImage] = useState('')
    const{id} = useParams()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})



     const submitHandler = async (e) => {
           e.preventDefault()
           if(!image) setErrors({url:'Upload images'})
           const spotId = +id
           await dispatch(createImageThunk(spotId,image))
           setShowModal(false)
     }
    return(
        // <div className="addImageContainer">
            <form className='addImagesForm'onSubmit={submitHandler}>
                <div className="addImagesInputContainer">
                    <label className="addImageLabel">Image:</label><br />
                    <input className="addImagesInput" type='text' value ={image} onChange = {(e)=> setImage(e.target.value)}/>
                    {errors?.url &&
                        <div className="errorContainer">
                            <div>
                               <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                            </div>
                            <div>
                                <span className='error' key={errors.url}>{errors.url}</span>
                            </div>
                        </div>
                    }

                </div>
                 <div className="addImagerBtnContainer">
                    <button className="addImageSubmitButton">Submit Images</button>

                </div>

            </form>
        // </div>
    )
}

export default AddImages
