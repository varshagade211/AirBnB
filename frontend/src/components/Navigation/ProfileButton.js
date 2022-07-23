import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logOutThunk());
  // };

  return (
    <>
     <div >
      <button className="userIconContainer" onClick={openMenu}>
        <i class="fa fa-bars barsIcon" aria-hidden="true"></i>
        <i className="fas fa-user-circle userIcon" />
      </button>
      <div className="showMenu">
      {/* {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.firstName}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )} */}
      </div>
    </div>
    </>
  );
}

export default ProfileButton;
