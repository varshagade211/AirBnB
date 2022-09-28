import React, { useState,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
import * as sessionActions from '../../store/session';
import igloo from '../../image/favicon.ico'
import BecomeHostNavButton from'./BecomeHostNavButton'
import { useHistory } from 'react-router-dom'


function Navigation({ }){
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const logout = (e) => {
    e.preventDefault();
    setShowMenu(false)
    dispatch(sessionActions.logOutThunk());
    history.push('/')
  };


  const demoUserLoginHandleSubmit = (e) => {
    e.preventDefault();
    const email ='demouser@gmail.com'
    const password = 'demoUserPassword'
    return dispatch(sessionActions.loginThunk({email, password}))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <li className='userData'>{sessionUser.firstName}</li>
        <li className='userData'>{sessionUser.email}</li>

        <hr className='line'></hr>

        {sessionUser && <NavLink to={'/spots/user/spots'}><button className= 'myLinkAllSpot'> My Listings</button> </NavLink>}
        <hr className='NavLinkline'></hr>
        {sessionUser && <NavLink to={'/reviews'}><button className= 'myLinkAllSpot'> My Reviews</button> </NavLink>}
        <hr className='NavLinkline'></hr>
        {sessionUser && <NavLink to={'/bookings'}><button className= 'myLinkAllSpot'>Trips</button> </NavLink>}
        <hr className='NavLinkline'></hr>
        <button className='logoutBtn'onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <div className='linksContainer'>
          <LoginFormModal className={'loginButton'} btnTxt={"Log In"}/>
          <hr className='NavLinkline'></hr>
          <SignupFormModal className={"signUpButton"} btnTxt={"Sing Up"}/>
          <hr className='NavLinkline'></hr>
          <button onClick={demoUserLoginHandleSubmit} className='demoUserBtn'>Demo User</button>
          <hr className='NavLinkline'></hr>
        </div>

      </div>
    );
  }

  //profilebutton logic
  const openMenu = () => {
     setShowMenu((prev) => !prev)

  };

 const onClose = () => {
  setShowMenu(false)
 }

  return (
    <ul className='mavlinksmainContainer'>

      <li className='navLinks'>
        <div className='logo-container'>
           <NavLink exact to="/"><img src={igloo} className="logo"/></NavLink>
           <h3 className='logo-name'>spots-bnb</h3>
        </div>
         <div className='becomeHostAndUserBtnContainer'>
         {showMenu && <div className='navbackgroundDiv' onClick={onClose} ></div>}
            <BecomeHostNavButton />
            <div className='linksAndButtonContainer'>

              <button className="userIconContainer" onClick={openMenu}>
                <i className="fa fa-bars barsIcon" aria-hidden="true"></i>
                <i className="fas fa-user-circle userIcon" />
              </button>
              {showMenu && <div className="singUplinksContainer" id='singUplinksContainer' >
              {showMenu && sessionLinks}
            </div>}

          </div>
      </div>
      </li>

    </ul>
  );
}

export default Navigation;
