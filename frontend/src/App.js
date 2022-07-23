
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from "./components/SignupFormPage";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
import LoginFormModal from './components/LoginFormModal';
import SignupFormModal from './components/SignupFormModal';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation className='navContainer' isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route path="/login">
          <LoginFormModal />
        </Route>
        <Route path="/signup">
          <SignupFormModal />
        </Route>
      </Switch>
    )}
  </>
  );
}

export default App;
