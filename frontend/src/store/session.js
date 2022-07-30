import {csrfFetch} from './csrf'


//---------------------------------------------------action creator unic variables-------------------------------------------------------------------------
const LOGIN_USER = 'session/loginUser'
const LOGOUT_USER = 'session/logoutUser'
const RESTORE_USER = 'session/restoreUser'
const SIGNUP_USER = 'session/signupUser'
const GET_USER = 'session/getUser'
//----------------------------------------------------regular action creator-----------------------------------------------------------
//signup action creator
const signupUser = (user) => {
    return{
        type:SIGNUP_USER,
        user
    }
}

//login action creator
const loginUser = (user) => {
    return{
        type:LOGIN_USER,
        user
    }
}
//logout action creator
const logOutUser = (response) => {
    return{
        type:LOGOUT_USER,
        response
    }
}
//restore action creator
// const restoreUser = (user) => {
//     return{
//         type:RESTORE_USER,
//         user
//     }
// }



//--------------------------------------------------thunk action creators-------------------------------------------------
//signup thunk
export const signupUserThunk = (user) => {
    return async function (dispatch) {
        const {firstName,lastName,email,password} = user
        const response = await csrfFetch('/api/users/signup',{
            method:'POST',
            body:JSON.stringify({
                email,
                firstName,
                lastName,
                password,

            })
        })
        const userData = await response.json()

        dispatch(signupUser(userData))
        return response;

    }
}
//login thunk
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
           const userData = await response.json()

           dispatch(loginUser(userData))
           return response;

}




//logout thunk
export const logOutThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/logout',{method:'DELETE'})
    const data = await response.json()
    dispatch(logOutUser(data))
    return response;

}
//restore thunk
export const restoreUserThunk = () => async dispatch => {
    // const response = await csrfFetch('/api/session');
    // const data = await response.json();
    // dispatch(restoreUser(data.user));
    // return response;
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(loginUser(data.user));

    return response;
  };

//---------------------------------------------------session reducer------------------------------------------------------------
const currentSessionUser = { user: null}
export const sessionReducer = (state = currentSessionUser, action) => {
    let newState
    switch(action.type) {
        case LOGIN_USER:{
            // newState = {user:action.user}
            // return newState
            //change this does not works
                newState = Object.assign({}, state);
                newState.user = action.user;
                return newState;
        }
        case LOGOUT_USER:{
            // if(action.response?.message === 'success'){
            //     newState = {...currentSessionUser}
            // }else{
            //     newState={...state}
            // }
            // return newState
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }

        // case RESTORE_USER:{
        //         if(action?.user?.id ){
        //             newState={user:action.user}
        //         }
        //         else{
        //             newState = {...currentSessionUser}
        //         }
        //        return newState

        // }
        case SIGNUP_USER:{
            newState = {user:action.user}
            return newState;
        }
        default:{
            return state
        }

    }
}
