import React, { useState } from 'react'

import {auth} from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
export default function useSignUp() {
    let [error,setError]=useState(null);
    let [loading,setLoading]=useState(null);
    let signUp=async (email,password)=>{
        try{
            setLoading(true);
           let res=await createUserWithEmailAndPassword(auth,email,password);
            setLoading(false);
            setError('');
            return res.user;
        }catch(e){
            setLoading(false);
            setError(e.message);
        }
    }
    return {error,loading,signUp}
}
