import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useHistory,Redirect } from "react-router-dom"
import { loginThunk } from "../../store/session"
import './LoginPage.css';
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

   return (
    <div className="formContainer">
        <h4>Log in or sign up </h4>
        <hr className='line'></hr>
        <h3 className="welcomMsg">Welcome to Airbnb</h3>
        <form className="loginForm" onSubmit={handleSubmit}>
             {/* <ul>
                 {errors.map((error, idx) => <li className='error' key={idx}>{error}</li>)}
            </ul> */}
            {/* <div> */}
                <label className="label">Email </label>
                <input type={'text'} placeholder = 'Enter Email Address' name={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />
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
                <label  className="label">Password </label>
                <input type={'password'} placeholder = 'Enter Password' name={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />
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

                <button className='submitButton' type={'submit'}>Login</button>

        </form>
    </div>
   )
}

export default LoginFormPage;
