import {useState} from 'react'
function SignupFormPage(){
    const [firstName,setFirstName]= useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return (
        <div>
            <div>
                <label> First Name:</label>
                <input type={'text'} name={'firstName'} value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div>
                <label> Last Name:</label>
                <input type={'text'} name={'lastName'} value={lastName} onChange={()=>setLastName(e.target.value)}/>
            </div>
            <div>
                <label> Email:</label>
                <input type={'email'} name={'email'} value={email} onChange={()=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label> Password:</label>
                <input type={'password'} name={'password'} value={password} onChange={()=>setPassword(e.target.value)}/>
            </div>

        </div>

    )

}
