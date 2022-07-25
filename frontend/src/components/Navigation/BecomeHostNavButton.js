import { NavLink } from 'react-router-dom'
import './BecomeHostButton.css'
function BecomeHostNavButton(){
    return(
       <div>
          <NavLink className={'becomeHostbtn' }to={'/becomehost'}>Become a Host</NavLink>

       </div>
    )
}

export default BecomeHostNavButton
