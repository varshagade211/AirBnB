

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupFormPage.css'
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
          console.log('error...........',data.errors)

          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors({confirmPassword:'Confirm Password field must be the same as the Password field'});

  };


  return (
    <div className="formContainer">
        <h4>Log in or sign up </h4>
     <hr className='line'></hr>
    <h3 className="welcomMsg">Welcome to Airbnb</h3>
    <form onSubmit={handleSubmit}>
        {/* <ul> */}
           {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        {/* </ul> */}

           <label className="label"> First Name:</label>
           <input type={'text'} name={'firstName'} value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
           {errors?.firstName &&
              <div className="errorContainer">
                  <div>
                      <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.firstName}>{errors.firstName}</span>
                  </div>
              </div>
            }

            <label className="label"> Last Name:</label>
            <input type={'text'} name={'lastName'} value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            {errors?.lastName &&
              <div className="errorContainer">
                  <div>
                      <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.lastName}>{errors.lastName}</span>
                  </div>
              </div>
            }

            <label className="label"> Email:</label>
            <input type={'text'} name={'email'} value={email} onChange={(e)=>setEmail(e.target.value)}/>
            {errors?.email &&
              <div className="errorContainer">
                  <div>
                      <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.email}>{errors.email}</span>
                  </div>
              </div>
            }

            <label className="label"> Password:</label>
            <input type={'password'} name={'password'} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {errors?.password &&
              <div className="errorContainer">
                  <div>
                      <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.password}>{errors.password}</span>
                  </div>
              </div>
            }

            <label className="label">  Confirm Password:</label>
            <input type={'password'} name={'password'} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            {errors?.confirmPassword &&
              <div className="errorContainer">
                  <div>
                      <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                  </div>
                  <div>
                      <span className='error' key={errors.confirmPassword}>{errors.confirmPassword}</span>
                  </div>
              </div>
            }

            <button className='submitButton'type="submit">Sign Up</button>

    </form>
    </div>
  );
}

export default SignupFormPage;
