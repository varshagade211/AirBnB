
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

//import Test from './components/Test'
// import './LoginForm.css';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage></LoginFormPage>
      </Route>
    </Switch>
  );
}

export default App;
