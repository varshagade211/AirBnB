
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from "./components/SignupFormPage";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
import LoginFormModal from './components/LoginFormModal';
import SignupFormModal from './components/SignupFormModal';
import AllSpots from './components/Spots/AllSpots'
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='appContainer'>
    <Navigation className='navContainer' isLoaded={isLoaded} setIsLoaded={setIsLoaded}/>
    <hr className='line'></hr>

    {/* {isLoaded && ( */}
      <Switch>
        <Route exact path="/">
            <AllSpots />
        </Route>
        <Route path="/login">
          <LoginFormModal />
        </Route>
        <Route path="/signup">
          <SignupFormModal />
        </Route>
      </Switch>
    {/* )} */}
  </div>
  );
}

export default App;
