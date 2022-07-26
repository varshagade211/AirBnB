import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/index'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {csrfFetch,restoreCSRF} from './store/csrf'
import * as sessionAction from "./store/session"
import { ModalProvider } from "./context/Modal";



const store = configureStore()
if(process.env.NODE_ENV !== 'production'){
  restoreCSRF()

  window.csrfFetch=csrfFetch
  window.store = store;
  window.sessionAction =sessionAction

}
const Root = () => {
   return (
      <Provider store={store}>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>

      </Provider>
   )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
