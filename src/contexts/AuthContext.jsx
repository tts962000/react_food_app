import React, { createContext } from 'react'
import { useEffect } from 'react';
import { useReducer } from 'react';
import {auth} from '../firebase/index'
import {onAuthStateChanged} from 'firebase/auth'
let AuthContext=createContext();
let AuthReducer=(state,action)=>{
  switch(action.type){
    case "LOG_IN":
      return {...state,user:action.payload}
    case "LOG_OUT":
      return {...state,user:null}
      case "AUTH_READY":
        return {...state,authReady:true}
      default:
        return state
  }
}
export default function AuthContextProvider({children}) {
  let [state,dispatch]=useReducer(AuthReducer,{
    user:null,
    authReady:false
  })
  useEffect(()=>{
   onAuthStateChanged(auth,(user)=>{ //1
     dispatch({type:"AUTH_READY"}); //2
    if(user){
      dispatch({type:"LOG_IN",payload:user})
    }else{
      dispatch({type:"LOG_OUT"});
    }
   })
  },[])
  return (
    <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
  )
}

export {AuthContext,AuthContextProvider};
