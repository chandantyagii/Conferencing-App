import React from "react" ;
import { Navigate, Outlet } from "react-router-dom";


 const  ProtectedRoutes =()=> {
    const auth = localStorage.getItem("token");
  //  token nhi to navigate aayega nhi to home ayega
 return    auth ? <Outlet/> : <Navigate to ="/login" />
}


export default ProtectedRoutes;
