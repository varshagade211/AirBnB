//import {  createStore,  applyMiddleware, compose, combineReducers} from "redux";
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk'
import {sessionReducer} from './session'
// applyMidleware
const rootReducer = combineReducers({
    session:sessionReducer
})


let enhancer;

if(process.env.NODE_ENV !== 'production'){
   const logger =require('redux-logger').default
   const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
   enhancer = composeEnhancer(applyMiddleware(thunk,logger))

}else{
    enhancer = applyMiddleware(thunk)
}




const configureStore = (payloadState)=>{
    return createStore(rootReducer, payloadState, enhancer)
}

export default configureStore;
