import {csrfFetch} from './csrf'

const LOGIN_USER = 'session/loginUser'
const LOGOUT_USER = 'session/logoutUser'
const RESTORE_USER = 'session/restoreUser'

const loginUser = (user) => {
    return{
        type:LOGIN_USER,
        user
    }

}
const logOutUser = (response) => {
    return{
        type:LOGOUT_USER,
        response
    }

}
const restoreUser = (user) => {
    return{
        type:RESTORE_USER,
        user
    }

}

export const loginThunk = (user) => async (dispatch) => {
        const {email , password} = user
         const response = await csrfFetch('/api/session/login',
         {
            method:'POST',
            body:JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json()
        // if(response.ok) {
            console.log(data)
            dispatch(loginUser(user))
            return response;
        // }
    }

export const logOutThunk = () => async (dispatch) => {
    const response = await csrfFetch('api/session/logout',{method:'DELETE'})
    const data = await response.json()
    dispatch(logOutUser(data))
    return data;

}
export const restoreUserThunk = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(restoreUser(data.user));
    return response;
  };


const currentSessionUser = { user: null}
export const sessionReducer = (state = currentSessionUser, action) => {
    let newState
    switch(action.type) {
        case LOGIN_USER:{
             newState = {user:action.user}

            return newState
            // newState = Object.assign({}, state);
            // newState.user = action.payload;
            // return newState;
        }
        case LOGOUT_USER:{
            if(action.response?.message === 'success'){
                newState = {...currentSessionUser}
            }else{
                newState={...state}
            }
        }
        case RESTORE_USER:{
                   console.log('form restore', action.user)
                if(action?.user?.id ){
                    newState={user:action.user}
                }else{
                    newState = {...currentSessionUser}
                }
               return newState

        }
        default:{
            return state
        }

    }
}
