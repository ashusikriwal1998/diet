import React, { useState } from 'react'
import TextField from '@mui/material/TextField';  
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {useLoginMutation} from '../Services';
import Cookies from 'universal-cookie';



const Login = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    "email": "",
    "password": ""
  });

  const cookies = new Cookies();


  const [loginAPI] = useLoginMutation()

  const handleChange =(e,state)=>{
      setUser({...user,[[state]]:e.target.value});
  }
  const submit =()=> { 
    
    loginAPI(user)
      .then((success) => {

          cookies.set("token", success.data.token, {
            expires: new Date(Date.now + 3*24*60*60*1000),
          });
          localStorage.setItem("data",success.data.user.firstname);
          localStorage.setItem("email",success.data.user.email);
          navigate("/");
      })
  }

  return (
    <div className='login_window'>
        <div className='login_box'>
        <TextField id="email" label="Email" type='email' variant="standard" onChange={(e)=>handleChange(e,'email')}/>
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={(e)=>handleChange(e,'password')}
        />
       
        <div className='btn_line '> <Button variant={user.password!=="" && user.password!=="" ? "outlined" : "disabled"} onClick={submit}>Sign in</Button></div>
        <div className='bottom_line' onClick={()=>navigate("/create")}><p>Create account</p><p>Forgot Password?</p></div>
        </div>
    </div>
  )
}

export default Login