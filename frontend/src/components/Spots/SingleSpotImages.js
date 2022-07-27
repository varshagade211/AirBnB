import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {loadSpotsThunk} from '../../store/spots'
import {useHistory, useParams} from 'react-router-dom'
import './SingleSpotImages.css'

function SingleSpotImages(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const spots = useSelector(state => state?.spots)
    const history = useHistory()
    let spotAllImages
    if(spots){
       let  singleSpot = spots[id]
       spotAllImages = singleSpot?.Images
    }

    useEffect(()=>{
        dispatch(loadSpotsThunk())
    },[dispatch])
    const backHandler = () => {
        history.push(`/spots/${id}`)
    }

    return(
        <div className='singleSpotImagesContaier'>
            <div className='arrowIconContainer' onClick={backHandler}>
            <i  class="fas fa-angle-left arrowIcon"></i>
            </div>
            <div className='SingleimageContainer'>
               {spotAllImages?.map((img)=> <img className='singleSpotImage'src={img?.image} alt='spot image'/>)}
            </div>
        </div>
    )
}

export default SingleSpotImages
