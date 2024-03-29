

import becomehost from '../../image/becomehost.JPG'
import './BecomeHostPage.css'
import LoginFormModal from '../LoginFormModal';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import igloo from '../../image/favicon.ico'
import Footer from '../Footer';
function BecomeHostPage(){
    const sessionUser = useSelector(state => state.session.user);
    return(
        <div className='becomHostContainer'>
            <div  className='becomHostInnerContainer'>
               <img className='videoImage'src={becomehost} alt = 'becomehost image' />
                <NavLink  exact to="/"><img  className='becomeHostLogo' src={igloo} /></NavLink>
                {sessionUser? <NavLink  className='becomeHostLoginLink' to="/spots">Try hosting</NavLink>:

                <LoginFormModal className='becomeHostLogineButton'/>}
            </div>


            <hr className='line hrLineAllSpot'></hr>
            <Footer />


        </div>
    )
}

export default BecomeHostPage
