import {useParams , useHistory, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect,useState } from 'react'
import {editSpotThunk,loadSpotsThunk} from '../../store/spots'
import './EditForm.css'
function EditForm() {
    let {id} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const spots = useSelector(state => state?.spots)
    const sessionUser = useSelector(state => state.session.user);


    useEffect(()=>{
        dispatch(loadSpotsThunk())
    },[dispatch])

    let updateSpot
    if(spots){
        updateSpot= spots[id]
        // if(sessionUser?.id !== updateSpot?.ownerId) {
        //     history.push('/')
        // }
    }

    const [name,setName] = useState(updateSpot?.name)
    const [address,setAddress] = useState(updateSpot?.address)
    const [city,setCity] = useState(updateSpot?.city)
    const [state,setState] = useState(updateSpot?.state)
    const [country,setCountry] = useState(updateSpot?.country)
    const [description,setDescription] = useState(updateSpot?.description)
    const [price,setPrice] = useState(updateSpot?.price)
    const [lat,setLat] = useState(updateSpot?.lat)
    const [lng,setLng] = useState(updateSpot?.lng)
    const [errors, setErrors] = useState({})


    const onSubmit= async (e)=>{
        e.preventDefault()
        id = +id
        const spotData ={
           id,name,address,city,state,country,description,price,lat,lng
        }

        const spot = await dispatch(editSpotThunk(spotData))
        .catch(async (res) => {
            const data = await res?.json();
            if (data && data?.errors) {
                setErrors(data?.errors);
            }
        });
        if (spot) {
            history.push('/spots/user/spots')
        }
        return
    }
    let threeSpotImages
    if(updateSpot?.Images){
        threeSpotImages = updateSpot?.Images?.slice(0,3)
    }

    const editImageHandler = () =>{

        history.push(`/spots/edit/${id}/images`)
    }
    const backHandler = () => {
        history.goBack()
    }
    return(

        <div>
            <div className= 'editSpotBackIconContainer' onClick={backHandler}>
            <i  className="fas fa-angle-left editSpotBackarrowIcon "></i>
            </div>

        <div className='editFormMainContainer'>


          <div className='editFormMainInsideContainer'>
            <div className='editButtonAndTitleContainer'>
                <div>
                <h2 className='editFormHeading'>Photos</h2>
                </div>

                <div>
                <button  onClick={editImageHandler} className='editImageButton'>Edit Image</button>
                </div>


            </div>
            <div className='editSpotImageContainer'>
              {threeSpotImages?.map((img,i)=><img key={i} className='editImagesInform' src={img?.image} alt='editImg' />)}
            </div>
           <div className='editFormContainer'>
            <form onSubmit={onSubmit}>
                <div className='editFormInputContainer'>
                <label className='editFormLabel'>Spot Name:</label>
                <input type='text'className='editFormInput'  name='spotName'  value ={name} onChange={(e) => setName(e.target.value)} />
                {errors?.name &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.name}>{errors.name}</span>
                        </div>
                    </div>
                }
                </div>
                <div  className='editFormInputContainer'>
                <label className='editFormLabel'>Address:</label>
                <input className='editFormInput' type='text' name='address'  value ={address} onChange={(e) => setAddress(e.target.value)}/>
                {errors?.address &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.address}>{errors.address}</span>
                        </div>
                    </div>
                }
               </div>
               <div  className='editFormInputContainer'>
                <label className='editFormLabel'>City:</label>
                <input className='editFormInput' type='text' name='city'  value ={city} onChange={(e) => setCity(e.target.value)} />
                {errors?.city &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.city}>{errors.city}</span>
                        </div>
                    </div>
                }
                </div>
                <div  className='editFormInputContainer'>
                <label className='editFormLabel'>State:</label>
                <input className='editFormInput' type='text' name='state'  value ={state}  onChange={(e) => setState(e.target.value)}/>
                {errors?.state &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.state}>{errors.state}</span>
                        </div>
                    </div>
                }
                </div>
                <div  className='editFormInputContainer'>
                <label className='editFormLabel'>Country:</label>
                <input className='editFormInput' type='text' name='country'   value ={country} onChange={(e) => setCountry(e.target.value)}/>
                {errors?.country &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.country}>{errors.country}</span>
                        </div>
                    </div>
                }
                </div>
                <div  className='editFormInputContainer'>
                <label className='editFormLabel'>Description</label>
                <textarea className='editFormInput'  name='desc'  value ={description} onChange={(e) => setDescription(e.target.value)}/>
                {errors?.description &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.description}>{errors.description}</span>
                        </div>
                    </div>
                }
                </div>
                <div  className='editFormInputContainer'>
                <label className='editFormLabel'>Price:</label>
                <input className='editFormInput' type='number' name='price'  value ={price} onChange={(e) => setPrice(e.target.value)}/>
                {errors?.price &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.price}>{errors.price}</span>
                        </div>
                    </div>
                }

                </div>
                <div  className='editFormInputContainer'>
                <label className='editFormLabel'>Latitude</label>
                <input className='editFormInput' type='number' name='lat'  min="0" step=".0001" value ={lat} onChange={(e) => setLat(e.target.value)}/>
                {errors?.lat &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.lat}>{errors.lat}</span>
                        </div>
                    </div>
                }
                </div>
                <div  className='editFormInputContainer'>
                <label className='editFormLabel'>Longitude:</label>
                <input  className='editFormInput' type='number' name='lng'  min="0" step=".0001"  value ={lng} onChange={(e) => setLng(e.target.value)}/>
                {errors?.lng &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.lng}>{errors.lng}</span>
                        </div>
                    </div>
                }
                 </div >
                 <div  className='editFormInputContainer'>
                    <button className='editSpotButton' type={'submit'}>Submit</button>
                </div>
            </form>
            {errors?.message &&
                    <div className="errorContainer">
                        <div>
                            <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.message}>{errors.message}</span>
                        </div>
                        <NavLink to='/'>Home</NavLink>
                    </div>
            }
            </div>
          </div>
        </div>
        </div>
    )
}


export default EditForm
