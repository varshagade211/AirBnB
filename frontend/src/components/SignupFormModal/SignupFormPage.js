

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css'
import LoginFormPage from '../LoginFormModal'
function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName,setLastName]=useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
       return dispatch(sessionActions.signupUserThunk({ email, firstName,lastName, password }))
        .catch(async (res) => {
          const data = await res.json();


          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors({confirmPassword:'Confirm Password field must be the same as the Password field'});

  };
  const demoUserLoginHandleSubmit = (e) => {
    e.preventDefault();
    const email ='demouser@gmail.com'
    const password = 'demoUserPassword'
    return dispatch(sessionActions.loginThunk({email, password}))
  }

  return (
    <div className="formContainer">
        <h4 className="loginTitle">Log in or sign up </h4>
     <hr className='line'></hr>

    <h3 className="signUpwelcomMsg">Welcome to spots-bnb</h3>

    <form className='signUpForm'onSubmit={handleSubmit}>
        {/* <ul> */}
           {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        {/* </ul> */}

           {/* <label className="signUplabel"> First Name:</label> */}
           <div>

           <input placeholder="First Name" className='signUpFormInput'type={'text'} name={'firstName'} value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>

           {errors?.firstName &&
              <div className="signUpErrorContainer">
                  <div>
                      <i className="fa-solid fa-circle-exclamation signUpErrorLogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.firstName}>{errors.firstName}</span>
                  </div>
              </div>
            }
           </div>

            {/* <label className="signUplabel"> Last Name:</label> */}
            <input type={'text'} className='signUpFormInput' name={'lastName'} placeholder = 'Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            {errors?.lastName &&
              <div className="signUpErrorContainer">
                  <div>
                      <i className="fa-solid fa-circle-exclamation signUpErrorLogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.lastName}>{errors.lastName}</span>
                  </div>
              </div>
            }

            {/* <label className="signUplabel"> Email:</label> */}
            <input type={'text'} className='signUpFormInput' name={'email'} placeholder = 'Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            {errors?.email &&
              <div className="signUpErrorContainer">
                  <div>
                      <i className="fa-solid fa-circle-exclamation signUpErrorLogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.email}>{errors.email}</span>
                  </div>
              </div>
            }

            {/* <label className="signUplabel"> Password:</label> */}
            <input type={'password'} className='signUpFormInput' name={'password'} placeholder = 'Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {errors?.password &&
              <div className="signUpErrorContainer">
                  <div>
                      <i className="fa-solid fa-circle-exclamation signUpErrorLogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.password}>{errors.password}</span>
                  </div>
              </div>
            }

            {/* <label className="signUplabel">  Confirm Password:</label> */}
            <input type={'password'} className='signUpFormInput' name={'password'}  placeholder = 'Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            {errors?.confirmPassword &&
              <div className="signUpErrorContainer">
                  <div>
                      <i className="fa-solid fa-circle-exclamation signUpErrorLogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.confirmPassword}>{errors.confirmPassword}</span>
                  </div>
              </div>
            }

            <button className='signUpSubmitButton'type="submit">Sign Up</button>

              <LoginFormPage  className='loginInstead' btnTxt={"Login instead"}/>
              <button onClick={demoUserLoginHandleSubmit} className='submitDemoUse'>Demo User</button>



    </form>
    </div>
  );
}

export default SignupFormPage;
