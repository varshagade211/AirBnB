import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
// import { useHistory,Redirect } from "react-router-dom"
import { loginThunk } from "../../store/session"
import './LoginPage.css';
function LoginFormPage() {
    const dispatch = useDispatch()
    const sessionUser =useSelector(state => state.session.user)
    // const history = useHistory()
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return (
    //     <Redirect to="/" />
    // );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
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
        <h3>Welcome to Airbnb</h3>
        <form onSubmit={handleSubmit}>
             <ul>
                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            {/* <div> */}
                <label className="label">Email </label>
                    <input type={'text'} name={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />

            {/* </div> */}
            {/* <div> */}
                <label  className="label">Password </label>
                <input type={'password'} name={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />

            {/* </div> */}
            {/* <div> */}
                <button className='submitButton' type={'submit'}>Login</button>

            {/* </div> */}

        </form>
    </div>
   )
}

export default LoginFormPage;
