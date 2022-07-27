

import becomehost from '../../image/becomehost.JPG'
import './BecomeHostPage.css'
import LoginFormModal from '../LoginFormModal';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BecomeHostPage(){
    const sessionUser = useSelector(state => state.session.user);
    return(
        <div >
            <img className='videoImage'src={becomehost} alt = 'becomehost image' />

            <NavLink  exact to="/"><i class="fa-brands fa-airbnb becomeHostLogo"></i></NavLink>
           {sessionUser? <NavLink  className='becomeHostLoginLink' to="/spots">Try hosting</NavLink>: <LoginFormModal/>}

        </div>
    )
}

export default BecomeHostPage
