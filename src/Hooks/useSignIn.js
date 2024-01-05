import React, { useState } from 'react'
import {auth} from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function useSignIn() {
    let [error,setError]=useState(null);
    let [loading,setLoading]=useState(false);
    let signIn=async(email,password)=>{
        try{
            setLoading(true);
            let res=await signInWithEmailAndPassword(auth,email,password);
            setLoading(false);
            setError('');
            return res.user;//important!
        }catch(e){  
            setLoading(false);
            setError(e.message);
        }
    }
    return {loading,error,signIn}
}
