import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useHistory,Redirect } from "react-router-dom"
import { loginThunk , logOutThunk} from "../../store/session"
function LoginFormPage() {
    const dispatch = useDispatch()
    const sessionUser =useSelector(state => state.session.user)
    const history = useHistory()
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
      );

    const submitHandler = async(e)=>{
       e.preventDefault()
       const user = {
        email,
        password
       }
       setErrors([]);
       setEmail('')
       setPassword('')
       const data =await dispatch(loginThunk(user))
    //    const data = await res.json();
        if (data && data.errors) setErrors(data.errors) ;
       history.push('/')
    }
    const loginHandler = async()=>{
        const response = await dispatch(logOutThunk())
        console.log(response.message)
    }
   return (
    <div>
        <div><button onClick={loginHandler}>Logout</button></div>
        <form onSubmit={submitHandler}>
             <ul>
                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <label>Email </label>
                    <input type={email} name={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} />

            </div>
            <div>
                <label>Password </label>
                <input type={password} name={'password'} value={password} onChange={(e)=>setPassword(e.target.value)} />

            </div>
            <div>
                <button type={'submit'}>Login</button>

            </div>

        </form>
    </div>
   )
}

export default LoginFormPage;
