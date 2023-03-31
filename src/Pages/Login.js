import React, { useState } from 'react'
import TextField from '@mui/material/TextField';  
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange =(e,state)=>{
      setUser({...user,[[state]]:e.target.value});
  }
  const submit =()=> {
    localStorage.setItem("username",user.username);
    navigate("/");
  }

  return (
    <div className='login_window'>
        <div className='login_box'>
        <TextField id="username" label="username" type='username' variant="standard" onChange={(e)=>handleChange(e,'username')}/>
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={(e)=>handleChange(e,'password')}
        />
       
        <div className='btn_line '> <Button variant={user.password!=="" && user.password!=="" ? "outlined" : "disabled"} onClick={submit}>Sign in</Button></div>
        <div className='bottom_line'><p>Create account</p><p>Forgot Password?</p></div>
        </div>
    </div>
  )
}

export default Login