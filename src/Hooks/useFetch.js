 import {useState,useEffect} from 'react';
 import {useRef} from 'react';

 function useFetch(url,method="GET"){
    let [data,setData]=useState(null);
    let [postData,setPostData]=useState(null);
    let [loading,setLoading]=useState(false);
    let [error,setError]=useState(null)
    // let option=useRef(_option).current;
    useEffect(()=>{
        // console.log(_option);
        let abortController=new AbortController();
        let signal=abortController.signal;
        let options={signal,method}
        setLoading(true);
        let fetchData=()=>{
            fetch(url,options)
        .then(res=>{
            if(!res.ok){
                throw Error('Url Error!');
            }
            return res.json()
        })
        .then(data=>{
            setData(data);
            setError(null);
            setLoading(false);
        })
        .catch(e=>{
            setError(e.message)
        })
        }
        if(method==="GET"){
            fetchData();
        }
        if(method==="POST" && postData){
            options={
                ...options,
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(postData)
            }
            fetchData();
        }
        //clean up function
        return ()=>{
            abortController.abort();
        }
    },[url,postData])
    return {setPostData,data,loading,error}
 }

 export default useFetch
 //primitive datatypes=string,boolean,int..
 //reference datatypes=Array,Object,Function
 //useRef is used for reference datatypes to prevent infinite loop