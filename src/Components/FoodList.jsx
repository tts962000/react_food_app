import React, { useContext } from 'react'
import Food from '../assets/KFC_1.webp'
import useFetch from '../Hooks/useFetch'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import useTheme from '../Hooks/useTheme';
import { useState } from 'react';
import {db} from '../firebase';
import { useEffect } from 'react';
import trash from '../assets/delete.svg';
import pencil from '../assets/edit.svg';
import {collection,getDocs, orderBy,query,doc,deleteDoc} from 'firebase/firestore';
import useFirestore from '../Hooks/useFirestore';
import { AuthContext } from '../contexts/AuthContext';
export default function FoodList() {
    // let {data:foods,loading,error}=useFetch('http://localhost:3001/foods')
    // let search='fries';
    let location=useLocation();
    let params=new URLSearchParams(location.search);
    // console.log(params.get('search'));
    // let search='fries'
    let search=params.get('search')
    let navigate=useNavigate();
    // let {data:foods,loading,error}=useFetch(`http://localhost:3001/foods?q=${search}`)
    // let {data:foods,loading,error}=useFetch(`http://localhost:3001/foods${search? `?q=${search}`:''}`)
    // let [error,setError]=useState('');
    // let [loading,setLoading]=useState(false);
    // let [foods,setFoods]=useState([]);
    let{getCollection,deleteDocument}=useFirestore();
    let {user}=useContext(AuthContext);
    let {error,loading,data:foods}=getCollection('foods',['uid','==',user.uid],{
        field:'title',
        value:search
    }); //form create 
    let deleteFood=async (e,id)=>{
        e.preventDefault();
        await deleteDocument('foods',id);
        // console.log(id);
        // let ref=doc(db,'foods',id);
        // await deleteDoc(ref);
        // setFoods(prevState=>prevState.filter(food=>food.id!==id));

    }
    
    // useEffect(()=>{
    //     setLoading(true);
    //     let ref=collection(db,'foods');
    //     //Alphabetical Order Bug Fix
    //     let q=query(ref,orderBy('date','desc'));
    //     getDocs(q).then(docs=>{
    //         if(docs.empty){
    //             setError('Data cannot be fetched');
    //             setLoading(false);
    //         }else{
    //             let foods=[];
    //             docs.forEach(doc=>{
    //                 let food={id:doc.id,...doc.data()}
    //                 foods.push(food);
    //             })
    //             setFoods(foods);
    //             setLoading(false);
    //             setError('');
    //         }
    //     })
    // },[])
    if(error){
        return <p>{error}</p>
    }
    let{isDark}=useTheme();
    return (
    <div>
        {loading && <p>Loading...</p>}
        {!!foods && <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
        {foods.map((food)=>(
            <Link to={`foods/${food.id}`} key={food.id} className={`p-4 border border-1 cursor-pointer min-h-[420px] ${isDark? 'bg-dcard border-primary':''}`}>
                <img src={food.cover}></img>
            <div className='space-y-2 text-center'>
                <h1 className={`text-bold ${isDark? 'text-white':''}`}>{food.title}</h1>
                <p className='text-red-500'>{food.price} Kyats</p>
                <span>{food.description}</span>
                <div className='flex flex-wrap justify-between'>
              <div className="mt-4">
               {food.categories.map(c=>(
                    <span key={c} className='mx-1 my-1 bg-black text-white px-3 py-2 rounded-full py-1'>{c}</span>
                ))}
              </div>
               <div className="flex space-x-3 items-center mt-4" >
                <img src={trash} alt="" onClick={(e)=>deleteFood(e,food.id)}/>
               {/* <Link to={`/edit/${food.id}`}> <img src={pencil} alt="" /></Link> */}
               <img onClick={(e)=>{e.preventDefault();navigate(`/edit/${food.id}`)}} src={pencil} alt="" />
               </div>
                </div>
            </div>
            </Link>
        ))}
    </div>  }
    {foods && !foods.length && <p className='text-center text-xl text-red-600'>No Results Found!</p>}
    </div>
  )
}
