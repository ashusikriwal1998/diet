import React, { useState } from 'react'
import TextField from '@mui/material/TextField';  
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {useCreateMutation} from '../Services';
import {toast } from 'react-toastify';




const Login = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    "firstname":"",
    "lastname":"",
    "email": "",
    "password": "",
    "re_password": ""
  });



  const [create] = useCreateMutation()

  const handleChange =(e,state)=>{
      setUser({...user,[[state]]:e.target.value});
  }
  const submit =()=> { 
    const temp = user;
    delete temp.re_password;
    create(temp)
    .then((success) => {
      if(!success.error){
      console.log(success);
      navigate("/login");
      toast("Account Created Successfully");
      }
      else{
        console.log(success);
        toast(success.error.data);
      }
  })
   
  }

 

  return (
    <div className='login_window'>
        <div className='create_box'>
        <TextField id="firstname" label="First Name" type='text' variant="standard" onChange={(e)=>handleChange(e,'firstname')}/>

        <TextField id="lastname" label="Last Name" type='text' variant="standard" onChange={(e)=>handleChange(e,'lastname')}/>

        <TextField id="email" label="Email" type='email' variant="standard" onChange={(e)=>handleChange(e,'email')}/>
        <TextField
          id="password"
          label="Enter Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={(e)=>handleChange(e,'password')}
        />

        <TextField
        id="component-error"
        aria-describedby="component-error-text"
          label="Enter Password again"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={(e)=>handleChange(e,'re_password')}

        />
         {
          (user.password!==user.re_password && user.re_password!=="") && <p className='error'>Password not matched</p>
          }
       
        <div className='btn_line '> <Button variant={user.email!=="" && user.password!=="" && user.firstname!=="" && user.lastname!=="" && (user.password===user.re_password)? "outlined" : "disabled"} onClick={submit}>Create an Account</Button></div>
        <div className='bottom_line_1' onClick={()=>navigate("/login")}><p>Already have an Account?</p></div>
        </div>
    </div>
  )
}

export default Login