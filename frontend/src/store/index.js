
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk'
import {sessionReducer} from './session'
//------------------------------------------------rootreducer--------------------------------------------------------------
const rootReducer = combineReducers({
    session:sessionReducer

})


//------------------------------------------------for console log in browser--------------------------------------------------------------

let enhancer;
if(process.env.NODE_ENV !== 'production'){
   const logger =require('redux-logger').default
   const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   enhancer = composeEnhancer(applyMiddleware(thunk,logger))

}else{
    enhancer = applyMiddleware(thunk)
}


//-----------------------------------------------configure store------------------------------------------------------------------

const configureStore = (payloadState)=>{
    return createStore(rootReducer, payloadState, enhancer)
}

export default configureStore;
