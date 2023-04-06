import React from 'react'
import {BrowserRouter,  Route, Routes } from "react-router-dom"
import Create_user from "./Pages/Create_user"
import Homepage from "./Pages/Homepage"
import Login from "./Pages/Login"
import PrivateRoutes from './PrivateRoutes'

const Routers = () => {
  return (
    <BrowserRouter>
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