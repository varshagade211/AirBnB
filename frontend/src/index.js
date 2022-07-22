import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/index'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {csrfFetch,restoreCSRF} from './store/csrf'

const store = configureStore()
if(process.env.NODE_ENV !== 'production'){
  restoreCSRF()
  window.csrfFetch=csrfFetch
  window.store = store;
}
const Root = () => {
   return (
      <Provider store={store}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
      </Provider>
   )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
