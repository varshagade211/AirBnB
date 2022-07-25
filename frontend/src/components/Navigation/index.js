import React, { useState,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './index.css';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import * as sessionActions from '../../store/session';
import logo from '../../image/logo.png'
import BecomeHostNavButton from'./BecomeHostNavButton'


function Navigation({ }){
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const logout = (e) => {
    e.preventDefault();
    setShowMenu(false)
    dispatch(sessionActions.logOutThunk());
  };
  let sessionLinks;
  if (sessionUser) {

    sessionLinks = (
      <div>
        <li className='userData'>{sessionUser.firstName}</li>
        <li className='userData'>{sessionUser.email}</li>
        <hr className='line'></hr>
        <button className='logoutBtn'onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <div className='linksContainer'>
          <LoginFormModal />
          <SignupFormModal />
        </div>
        <hr className='line'></hr>
      </div>
    );

  }

  //profilebutton logic
  const openMenu = () => {
    setShowMenu((prev) => !prev)

  };




  return (
    <ul>
      <li className='navLinks'>
        <div className='logo-container'>
           <NavLink exact to="/"><img className ='logo' src={logo} alt='logo' /></NavLink>
           <h3 className='logo-name'>airbnb-spots</h3>
        </div>
         <div className='becomeHostAndUserBtnContainer'>
            <BecomeHostNavButton />
            <div className='linksAndButtonContainer'>
              <button className="userIconContainer" onClick={openMenu}>
                <i class="fa fa-bars barsIcon" aria-hidden="true"></i>
                <i className="fas fa-user-circle userIcon" />
              </button>
              {showMenu && <div className="singUplinksContainer" id='singUplinksContainer'>
              {showMenu && sessionLinks}
              {sessionUser && <NavLink to={'/spots/user/spots'}> My Spots </NavLink>}
            </div>}
          </div>
      </div>
      </li>

    </ul>
  );
}

export default Navigation;
