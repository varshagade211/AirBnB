import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createSpotThunk} from '../../store/spots'
import {NavLink, useHistory} from 'react-router-dom'
import {createImageThunk} from '../../store/image'
import './CreateSpot.css'
function CreateSpot(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [country,setCountry] = useState('')
    const [description,setDescription] = useState('')
    const [imageUrl1,setImageUrl1] = useState('')
    const [imageUrl2,setImageUrl2] = useState('')
    const [imageUrl3,setImageUrl3] = useState('')
    const [imageUrl4,setImageUrl4] = useState('')
    const [imageUrl5,setImageUrl5] = useState('')
    const [price,setPrice] = useState(0)
    const [lat,setLat] = useState(-90)
    const [lng,setLng] = useState(-180)
    const [errors, setErrors] = useState({})

    const onSubmit= async (e)=>{
        e.preventDefault()
         const formErrors = {}
        if(!name || typeof name !== 'string' || name.length === 0 || name.length>=50 ) {
            formErrors.name='Name must be less than 50 characters'
        }
        if(!address || typeof address !== 'string' || address.length === 0) {
            formErrors.address='Street address is required'
        }
        if(!city || typeof city !== 'string' || city.length === 0) {
            formErrors.city='City is required'
        }
        if(!state || typeof state !== 'string' || state.length === 0) {
            formErrors.state='State is required'
        }
        if(!country || typeof country !== 'string' || country.length === 0) {
            formErrors.country='Country is required'
        }
        let newLat = parseInt(price)
        if(!newLat || typeof newLat !== 'number') {
            formErrors.lat='Latitude is not valid'
        }
        let newLng = parseInt(price)
        if(!newLng || typeof newLng !== 'number'){
            formErrors.lng='Longitude is not valid'
        }
        if(!description || typeof description !== 'string' || description.length === 0) {
            formErrors.description='Description is required'
        }
       let newPrice = parseInt(price)
        if(!newPrice || newPrice === NaN || newPrice <= 0) {
            console.log('inside price', typeof newPrice , newPrice)
            formErrors.price='Price per day is required'
        }

        if(!imageUrl1 || typeof imageUrl1 !== 'string' || imageUrl1.length === 0) {
            formErrors.url='Upload minimum five images'
        }
        if(!imageUrl2 || typeof imageUrl2 !== 'string' || imageUrl2.length === 0) {
            formErrors.url='Upload minimum five images'
        }
        if(!imageUrl3 || typeof imageUrl3 !== 'string' || imageUrl3.length === 0) {
            formErrors.url='Upload minimum five images'
        }
        if(!imageUrl4 || typeof imageUrl4 !== 'string' || imageUrl4.length === 0) {
            formErrors.url='Upload minimum five images'
        }
        if(!imageUrl5 || typeof imageUrl5 !== 'string' || imageUrl5.length === 0) {
            formErrors.url='Upload minimum five images'
        }
        if (Object.keys(formErrors).length) {
            setErrors(formErrors)
            return
        }

        const spotData ={
            name,address,city,state,country,description,price,lat,lng
        }

        const spot = await dispatch(createSpotThunk(spotData))
        .catch(async (res) => {
          const data = await res?.json();
          if (data && data?.errors) {
            setErrors(data?.errors);
          }
        });

        if (spot) {
            await dispatch(createImageThunk(spot?.id,imageUrl1))
            await dispatch(createImageThunk(spot?.id,imageUrl2))
            await dispatch(createImageThunk(spot?.id,imageUrl3))
            await dispatch(createImageThunk(spot.id,imageUrl4))
            await dispatch(createImageThunk(spot?.id,imageUrl5))
            history.push('/spots/user/spots')
        }
        return
    }
    return(
        <div className='createSpotFormOuterContainer'>
            <div className='colorDiv'>
                <div className='firstDiv'>
                <div className='createSpotLogoContainer'>
                <NavLink  exact to="/"><i class="fa-brands fa-airbnb createPageHomeLogo"></i></NavLink>

                </div>
                <div className='createTextWelcomeTxtDiv'>
                <h2 className='createSpotWelcomeTxt'>Welcome To airbnb-spots !!!</h2>

                </div>

                </div>
                <div className='seconColor'>

                </div>
            </div>
            <div className='createSpotInnerFormContainer'>

            <div className='createSpotFromContainer'>
            <form className='createSpotForm' onSubmit={onSubmit}>
                <div className='createSpotFormInputContainer'>
                 <label className='createFormLabel'>Spot Name:</label><br/>
                 <input className='createSpotInputs' type='text'  name='spotName' placeholder='Enter Spot Name' value ={name} onChange={(e) => setName(e.target.value)} />

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
                 <div  className='createSpotFormInputContainer'>
                <label className='createFormLabel'>Address:</label><br/>

                <input className='createSpotInputs' type='text' name='address' placeholder='Enter Address'  value ={address} onChange={(e) => setAddress(e.target.value)}/>
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
               <div  className='createSpotFormInputContainer'>
                <label className='createFormLabel'>City:</label><br/>
                <input className='createSpotInputs' type='text' name='city' placeholder='Enter City' value ={city} onChange={(e) => setCity(e.target.value)} />
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
                <div  className='createSpotFormInputContainer'>
                <label className='createFormLabel'>State:</label><br/>
                <input className='createSpotInputs' type='text' name='state' placeholder='Enter State' value ={state}  onChange={(e) => setState(e.target.value)}/>
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
                <div  className='createSpotFormInputContainer'>


                <label className='createFormLabel'>Country:</label><br/>
                <input className='createSpotInputs' type='text' name='country'   placeholder='Enter Country'value ={country} onChange={(e) => setCountry(e.target.value)}/>
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
                  <div  className='createSpotFormInputContainer'>
                <label className='createFormLabel'>Description:</label><br/>
                <textarea className='createSpotInputs' name='desc' placeholder='Enter Description' value ={description} onChange={(e) => setDescription(e.target.value)}/><br />
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
                 <div  className='createSpotFormInputContainer'>

                 <label className='createFormLabel'>Price:</label><br/>
                <input type='number' className='createSpotInputs' name='price' placeholder='Enter Price'  value ={price} onChange={(e) => setPrice(e.target.value)}/>
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
                <div  className='createSpotFormInputContainer'>
                <label className='createFormLabel'>Latitude</label><br/>

                <input type='number' className='createSpotInputs' name='lat' placeholder='Enter Latitude'  step=".0001" value ={lat} onChange={(e) => setLat(e.target.value)}/>
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
                <div  className='createSpotFormInputContainer'>
                <label className='createFormLabel'> Longitude:</label><br/>
                <input type='number'className='createSpotInputs' placeholder='Enter Longitude'  name='lng' step=".0001"  value ={lng} onChange={(e) => setLng(e.target.value)}/>
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
                </div>
                <div  className='createSpotFormInputContainer'>
                   <label className='createFormLabel'>Image 1:</label><br/>
                  <input className='createSpotInputs' type='text' name='image'  placeholder='Enter Image Url'  value={imageUrl1}  onChange={(e) => setImageUrl1(e.target.value) }/><br />
                </div>
                <div  className='createSpotFormInputContainer'>
                  <label className='createFormLabel'>Image 2:</label><br/>
                  <input className='createSpotInputs' type='text' name='image'  placeholder='Enter Image Url'  value={imageUrl2}  onChange={(e) => setImageUrl2(e.target.value) }/><br />
                </div>
                <div  className='createSpotFormInputContainer'>
                  <label className='createFormLabel'>Image 3:</label><br/>
                  <input className='createSpotInputs' type='text' name='image'  placeholder='Enter Image Url'  value={imageUrl3}  onChange={(e) => setImageUrl3(e.target.value) }/><br />
                 </div>
                 <div  className='createSpotFormInputContainer'>
                  <label className='createFormLabel'>Image 4:</label><br/>
                  <input className='createSpotInputs' type='text' name='image'  placeholder='Enter Image Url' value={imageUrl4}  onChange={(e) => setImageUrl4(e.target.value) }/><br />
                 </div>
                 <div  className='createSpotFormInputContainer'>
                  <label className='createFormLabel'>Image 5:</label><br/>
                  <input className='createSpotInputs' type='text' name='image' placeholder='Enter Image Url'  value={imageUrl5}  onChange={(e) => setImageUrl5(e.target.value) }/><br />

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
                <div  className='createSpotFormInputContainer'>
                <button className='SpotSubmitButton' type={'submit'}>Submit</button>
                </div>
            </form>
            </div>
            <div  className='createSpotFormInputContainer'>
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
    )
}

export default CreateSpot;
