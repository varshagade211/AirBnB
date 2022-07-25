// import {useParams , useHistory, NavLink} from 'react-router-dom'
// import {useDispatch, useSelector} from 'react-redux'

// import { useEffect,useState } from 'react'
// // import {editSpotThunk,} from '../../store/spots'
// function EditForm() {
//     let {id} = useParams()
//     id= +id
//     const history = useHistory()
//     const dispatch = useDispatch()
//     const spots = useSelector(state => state?.spots)
//     const updateSpot = spots?.id

//     const [name,setName] = useState(updateSpot?.name)
//     const [address,setAddress] = useState(updateSpot?.address)
//     const [city,setCity] = useState(updateSpot?.city)
//     const [state,setState] = useState(updateSpot?.state)
//     const [country,setCountry] = useState(updateSpot?.country)
//     const [description,setDescription] = useState(updateSpot?.description)
//     // const [imageUrl,setImageUrl] = useState(updateSpot)
//     const [price,setPrice] = useState(updateSpot?.price)
//     const [lat,setLat] = useState(updateSpot?.lat)
//     const [lng,setLng] = useState(updateSpot?.lng)
//     const [errors, setErrors] = useState({})


//     const onSubmit= async (e)=>{
//         e.preventDefault()

//         const spotData ={
//            id,name,address,city,state,country,description,price,lat,lng
//         }

//     return dispatch(editSpotThunk(spotData))
//     .catch(async (res) => {
//       const data = await res?.json();
//       if (data && data?.errors) {
//         setErrors(data?.errors);

//       }
//     });

//     }
//     return(
//         <div>
//         <form onSubmit={onSubmit}>
//                 <label>Spot Name:</label>
//                 <input type='text' name='spotName'  value ={name} onChange={(e) => setName(e.target.value)} />
//                 {errors?.name &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.name}>{errors.name}</span>
//                         </div>
//                     </div>
//                 }

//                 <label>Address:</label>
//                 <input type='text' name='address'  value ={address} onChange={(e) => setAddress(e.target.value)}/>
//                 {errors?.address &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.address}>{errors.address}</span>
//                         </div>
//                     </div>
//                 }

//                 <label>City:</label>
//                 <input type='text' name='city'  value ={city} onChange={(e) => setCity(e.target.value)} />
//                 {errors?.city &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.city}>{errors.city}</span>
//                         </div>
//                     </div>
//                 }

//                 <label>State:</label>
//                 <input type='text' name='state'  value ={state}  onChange={(e) => setState(e.target.value)}/>
//                 {errors?.state &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.state}>{errors.state}</span>
//                         </div>
//                     </div>
//                 }

//                 <label>Country:</label>
//                 <input type='text' name='country'   value ={country} onChange={(e) => setCountry(e.target.value)}/>
//                 {errors?.email &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.country}>{errors.country}</span>
//                         </div>
//                     </div>
//                 }

//                 <label>Description</label>
//                 <textarea  name='desc'  value ={description} onChange={(e) => setDescription(e.target.value)}/>
//                 {errors?.description &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.description}>{errors.description}</span>
//                         </div>
//                     </div>
//                 }

//                  {/* <label>Image:</label>
//                 <input type='text' name='image' value={imageUrl}  onChange={(e) => setImageUrl(e.target.value) }/>
//                 {errors?.url &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.url}>{errors.url}</span>
//                         </div>
//                     </div>
//                 } */}

//                  <label>Price:</label>
//                 <input type='number' name='price'  value ={price} onChange={(e) => setPrice(e.target.value)}/>
//                 {errors?.price &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.price}>{errors.price}</span>
//                         </div>
//                     </div>
//                 }

//                 <label>Latitude</label>

//                 <input type='number' name='lat'  min="0" step=".0001" value ={lat} onChange={(e) => setLat(e.target.value)}/>
//                 {errors?.lat &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.lat}>{errors.lat}</span>
//                         </div>
//                     </div>
//                 }

//                 <label>Longitude:</label>
//                 <input type='number' name='lng'  min="0" step=".0001"  value ={lng} onChange={(e) => setLng(e.target.value)}/>
//                 {errors?.lng &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.lng}>{errors.lng}</span>
//                         </div>
//                     </div>
//                 }

//                 <button className='SpotButton' type={'submit'}>Submit</button>
//             </form>
//             {errors?.message &&
//                     <div className="errorContainer">
//                         <div>
//                             <i class="fa-solid fa-circle-exclamation errorlogo"></i>
//                         </div>
//                         <div>
//                             <span className='error' key={errors.message}>{errors.message}</span>
//                         </div>
//                         <NavLink to='/'>Home</NavLink>
//                     </div>
//                 }

//         </div>
//     )
// }


// export default EditForm
