import React from 'react'
import {BrowserRouter,  Route, Routes } from "react-router-dom"
import Create_user from "./Pages/Create_user"
import Homepage from "./Pages/Homepage"
import Login from "./Pages/Login"
import PrivateRoutes from './PrivateRoutes'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Routers = () => {
  return (
    <BrowserRouter>
     <ToastContainer 
          position="top-right"
        />
    <Routes>
        <Route  path="/login" element={<Login/>} />

            <Route element={<PrivateRoutes/>}>
             <Route exact path="/" element={<Homepage/>} />
            </Route>

        
        <Route  path="/create" element={
          // eslint-disable-next-line
        <Create_user/>} />
    </Routes>
    
</BrowserRouter>

  )
}

export default Routers