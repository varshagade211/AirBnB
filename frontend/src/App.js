
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormModal/LoginFormPage';
// import SignupFormPage from "./components/SignupFormPage";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
import LoginFormModal from './components/LoginFormModal';
import SignupFormModal from './components/SignupFormModal';
import AllSpots from './components/Spots/AllSpots'
import './App.css';
import BecomeHostPage from './components/Spots/BecomeHostPage'
import CreateSpot from './components/Spots/CreateSpot'
import CurrentUserSpots from './components/Spots/CurrentUserSpot'
import SingleSpot from './components/Spots/SingleSpot'
import EditForm from './components/Spots/EditForm'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='appContainer'>
   {/* {isLoaded && ( */}
      <Switch>

        <Route exact path="/">
           <Navigation className='navContainer'/>
           <hr className='line'></hr>
           <AllSpots />
        </Route>
        <Route exact path='/api/spots/user/spots'>
           <Navigation className='navContainer'/>
           <hr className='line'></hr>
           <CurrentUserSpots />
        </Route>
        <Route exact path="/becomehost">
           <BecomeHostPage />
        </Route>
        <Route exact path="/login">
          <LoginFormModal />
        </Route>
        <Route exact path="/signup">
          <SignupFormModal />
        </Route>
        <Route exact path='/spots'>
           <CreateSpot />
        </Route>
        <Route exact path='/api/spots/:id'>
           <Navigation className='navContainer'/>
           <hr className='line'></hr>
           <SingleSpot />
        </Route>
        <Route exact path='/spots/edit/:id'>
           <EditForm />
        </Route>
      </Switch>
    {/* )} */}
  </div>
  );
}

export default App;
