import React from 'react'
import { Outlet, Navigate } from 'react-router'




const PrivateRoutes = () => {


  

  

  return (
    localStorage.getItem("username")!=="" && localStorage.length>0? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes