import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useHistory,Redirect } from "react-router-dom"
import { loginThunk } from "../../store/session"
import * as sessionActions from '../../store/session';
import './LoginPage.css';
import SignupFormModal from "../SignupFormModal";
function LoginFormPage() {
    const dispatch = useDispatch()
    const sessionUser =useSelector(state => state?.session?.user)

    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(loginThunk({ email, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      }
    const demoUserLoginHandleSubmit = (e) => {
        e.preventDefault();
        const email ='demouser@gmail.com'
        const password = 'demoUserPassword'
        return dispatch(sessionActions.loginThunk({email, password}))
      }
   return (
    <div className="formContainer">
        <h4 className="loginFormLogo">Log in or sign up </h4>
        <hr className='line'></hr>
        <h3 className="welcomMsg">Welcome to Airbnb</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
             {/* <ul>
                 {errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
            </ul> */}
            {/* <div> */}
                <label className="loginLabel">Email </label>
                <input className='loginFormInput' type={'text'} placeholder = 'Enter Email Address' name={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />
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
                <label  className="loginLabel">Password </label>
                <input className='loginFormInput' type={'password'} placeholder = 'Enter Password' name={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
                {errors?.password &&
                    <div className="errorContainer">
                        <div>
                            <i className="fa-solid fa-circle-exclamation errorlogo"></i>
                        </div>
                        <div>
                            <span className='error' key={errors.password}>{errors.password}</span>
                        </div>
                    </div>
                }

                <button className='submitButton' type={'submit'}>Login</button>

                <div className="submitDemoUseContainer">
                    <p className="demoOption">Just looking? Use Demo mode to sign in and preview.</p>
                    <button onClick={demoUserLoginHandleSubmit} className='submitDemoUse'>Demo User</button>
                    {/* <button onClick={()=>history(/)} className='submitDemoUse'>Create Account</button> */}
                    <SignupFormModal className='submitDemoUse' btnTxt={"Create account"} />
                </div>

        </form>
    </div>
   )
}

export default LoginFormPage;
