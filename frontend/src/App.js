
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
import SingleSpotImages from './components/Spots/SingleSpotImages'
import EditImages from './components/Spots/EditImages';
import DeletePopUpModal from './components/ImageDeleteModal'
import Reviews from './components/Reviews';
import Bookings from './components/Bookings'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='appContainer'>
      <Switch>
        <Route exact path="/">
          <Navigation className='navContainer'/>
          <hr className='line'></hr>
          <AllSpots />
        </Route>

        <Route exact path='/spots/user/spots'>
          <Navigation className='navContainer'/>
          <hr className='line'></hr>
          <CurrentUserSpots />
        </Route>

        <Route exact path="/becomehost">
          <BecomeHostPage />
        </Route>

        <Route exact path='/spots'>
          <CreateSpot />
        </Route>

        <Route exact path='/spots/:id'>
          <SingleSpot />
        </Route>

        <Route exact path='/spots/edit/:id'>
          <Navigation className='navContainer'/>
          <hr className='line'></hr>
          <EditForm />
        </Route>

        <Route exact path='/spots/edit/:id/images'>
          <Navigation className='navContainer'/>
          <hr className='line'></hr>
          <EditImages />
        </Route>

        <Route exact path='/images/:id'>
          <SingleSpotImages />
        </Route>

        <Route exact path='/reviews'>
          <Navigation className='navContainer'/>
          <hr className='line'></hr>
          < Reviews />
        </Route>

        <Route exact path='/bookings'>
          <Navigation className='navContainer'/>
          <hr className='line'></hr>
          < Bookings />
        </Route>

      </Switch>
    {/* )} */}
  </div>
  );
}

export default App;
