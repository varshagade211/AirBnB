import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'

function Navigation({ isLoaded }){
  // const [showSignUpBox,setShowSignupBox] = useState(false)
  console.log('isLoaded', isLoaded)
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {

    sessionLinks = (
      <>
      <LoginFormModal />
      <SignupFormModal />
        {/* <NavLink to="/login">Log In</NavLink> */}
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );

  }

  return (
    <ul>
      <li className='navLinks'>
        <NavLink exact to="/">Home</NavLink>
        <div className='sigupAndUserIconContainer'>
            <div className='userIconContainer'>
               <i class="fa fa-bars barsIcon" aria-hidden="true"></i>
               <i className="fas fa-user-circle userIcon" />
            </div>
            <div className='singUplinksContainer'>
              {isLoaded && sessionLinks}
            </div>
         </div>
      </li>

    </ul>
  );
}

export default Navigation;




// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';
// import LoginFormModal from '../LoginFormModal'
// import SignupFormModal from '../SignupFormModal'

// function Navigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <ProfileButton user={sessionUser} />
//     );
//   } else {
//     sessionLinks = (
//       <>
//       <LoginFormModal />
//       <SignupFormModal />
//         {/* <NavLink to="/login">Log In</NavLink>
//         <NavLink to="/signup">Sign Up</NavLink> */}
//       </>
//     );
//   }

//   return (
//     <ul>
//       <li>
//         <NavLink exact to="/">Home</NavLink>
//         <div className='sigupAndUserIconContainer'>
//         <div className='userIconContainer'>
//                <i class="fa fa-bars barsIcon" aria-hidden="true"></i>
//                <i className="fas fa-user-circle userIcon" />
//             </div>
//         <div className='singUplinksContainer'>
//           {isLoaded && sessionLinks}
//         </div>
//       </div>
//       </li>
//     </ul>
//   );
// }

// export default Navigation;
