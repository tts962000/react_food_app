import {
    createBrowserRouter,
    RouterProvider,
    Navigate
  } from "react-router-dom";
import Layout from "../Layouts/Layout.jsx";
import Home from "../Pages/Home.jsx";
import FoodDetail from "../Pages/FoodDetail.jsx";
import FoodForm from "../Pages/FoodForm.jsx";
import Register from "../Pages/Register.jsx";
import Login from "../Pages/Login.jsx";
  import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
  
  export default function index() {
    let {authReady,user}=useContext(AuthContext);
    const isAuthenticated=Boolean(user);
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout/>,
        children:[
          {
              path:"",
              element:isAuthenticated?<Home/>:<Navigate to="/login"/>
          },
          {
            path:"/create",
            element:isAuthenticated? <FoodForm/>:<Navigate to="/login"/>
          },
          {
          path:"/edit/:id",
          element:isAuthenticated? <FoodForm/>:<Navigate to="/login"/>
          },
          {
          path:"/register",
          element:!isAuthenticated? <Register/>:<Navigate to="/"/>
          },
          {
            path:"/login",
            element:!isAuthenticated? <Login/>:<Navigate to="/"/>
            },
          {
            path:"/foods/:id",
            element:isAuthenticated? <FoodDetail/>:<Navigate to="/login"/>
          }
        ]
      },
    ]);
    return (
      authReady && <RouterProvider router={router} />
    )
  }
  
  
