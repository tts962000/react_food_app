import React, { useState } from 'react'
import {auth} from '../firebase';
import { signOut } from 'firebase/auth';

export default function useSignOut() {
  
    let [error,setError]=useState(null);
    let [loading,setLoading]=useState(false);
    let logOut=()=>{
        try{
            setLoading(true);
            let res=signOut(auth);
            setLoading(false);
            setError('');
            return res.user;
        }catch(e){
            setLoading(false);
            setError(e.message);
        }
        
    }
    return {error,loading,logOut};
}
