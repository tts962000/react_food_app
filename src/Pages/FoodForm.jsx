import React, { useState } from 'react'
import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useTheme from '../Hooks/useTheme';
import { getDoc,doc, serverTimestamp } from 'firebase/firestore';
import {db, storage} from '../firebase';
import useFirestore from '../Hooks/useFirestore';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { uploadBytes,ref, getDownloadURL } from 'firebase/storage';
export default function Create() {
  let [title,setTitle]=useState('');
  let [price,setPrice]=useState('');
  let [description,setDescription]=useState('');
  let [newcategory,setNewCategory]=useState('');
  let [categories,setCategories]=useState([]);
  let [file,setFile]=useState(null);
  let [preview,setPreview]=useState('');
  let {id}=useParams();
  let [isEdit,setIsEdit]=useState(false);
  let {addCollection,updateDocument}=useFirestore();
  let {user}=useContext(AuthContext);
  // let{setPostData,data:food}=useFetch('http://localhost:3001/foods',"POST");
  useEffect(()=>{
    //Edit form
    if(id){
      console.log(id);
      setIsEdit(true)
      let ref=doc(db,'foods',id);
      getDoc(ref).then(doc=>{
       if(doc.exists()){
        let{title,price,categories,description}=doc.data();
        setTitle(title);
        setPrice(price);
        setDescription(description);
        setCategories(categories);
        // console.log('food name is '+title);
        // console.log('food price is '+price);
        // console.log('food categories is '+categories);
        // console.log('food description is '+description);

       }
      });
    }else{
      // console.log('Create Form');
      setIsEdit(false);
      setTitle('');
        setPrice('');
        setDescription('');
        setCategories([]);
    }
  },[id]);
  let addCategory=()=>{
    setCategories(prev=>[newcategory,...prev]);
    setNewCategory('');
  }
  
 let photoHandler=(e)=>{ //1
  // console.log(e.target.files[0]);
  setFile(e.target.files[0]);
 }
let handlePreviewImage=(file)=>{ //3
  // console.log("File Preview Here");
  //JS CODE only
  let reader=new FileReader; 
  reader.readAsDataURL(file);
  reader.onload=()=>{
    // console.log(reader.result);
    setPreview(reader.result);
  }
}
   useEffect(()=>{ //2
      if(file){
        // console.log("Preview Handling");
        handlePreviewImage(file);
      }
   },[file])
   let uploadToFireBase=async(file)=>{
    //3 need unique name
    let uniqueFileName=Date.now().toString()+"_"+file.name;
    //2 need path
    let path="/covers/"+user.uid+"/"+uniqueFileName
    // console.log(path);
    //1 need path
    let storageRef=ref(storage,path)
    await uploadBytes(storageRef,file);
    // console.log(res);
    // let url=await getDownloadURL(storageRef)
    // console.log(url);
    //4
    return await getDownloadURL(storageRef);
   }
  let submitFood=async (e)=>{
    e.preventDefault();
    let url=await uploadToFireBase(file);
    let data={
      title,
      price,
      description,
      categories,
      // date:serverTimestamp(), //important
      uid:user.uid,
      cover:url
    }
    // console.log(foodData);
    // console.log(data)
    // setPostData(foodData)
    //firebase store
    if(isEdit){
      
      await updateDocument('foods',id,data);
      // let ref=doc(db,'foods',id);
      // await updateDoc(ref,foodData);
    }else{
      await addCollection('foods',data);
      // let ref=collection(db,'foods');
      // await addDoc(ref,foodData);
    }
    navigate('/');
  }
  let navigate=useNavigate();
  // useEffect(()=>{
  //   // console.log(food);
  //   if(food){
  //     navigate('/')
  //   }
  // },[food])
  let{isDark}=useTheme();
  
  return (
    
      <div className='h-screen'>
        <form className="w-full max-w-lg mx-auto mt-5" onSubmit={submitFood}>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark? 'text-white':''}`} htmlFor="grid-first-name">
        Food Name
      </label>
      <input value={title} onChange={e=>setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Food Name"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark? 'text-white':''}`} htmlFor="grid-first-name">
        Food Price 
      </label>
      <input value={price} onChange={e=>setPrice(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Enter Food Price"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark? 'text-white':''}`} htmlFor="grid-first-name">
        Food Category 
      </label>
      <div className='flex gap-2 items-center'>
      <input value={newcategory} onChange={e=>setNewCategory(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Food Category"/>
      <button type='button' onClick={addCategory}
                        
                        className="flex items-center bg-red-500 px-3 py-2 rounded-full mb-3"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </button>
      </div>
      <div className='flex flex-wrap'>
        {categories.map(c=>(
          <span className='mx-1 my-1 bg-black text-white px-3 py-2 rounded-full py-1' key={c}>{c}</span>
        ))}
      </div>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark? 'text-white':''}`} htmlFor="grid-first-name">
        Food Description 
      </label>
      <textarea onChange={e=>setDescription(e.target.value)} value={description} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Food Description"/>
    </div>
  </div>
  <div className="w-full px-3 my-3">
      <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark? 'text-white':''}`} htmlFor="grid-first-name">
        Food Image
      </label>
      <input type="file" id="" onChange={photoHandler}/>
      {!!preview && <img src={preview} alt="" className='my-3' width={500} height={500} />}
    </div>
  <button to="/create" className="flex gap-1 align-items text-white bg-primary px-3 py-2 rounded-2xl w-full justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

              <span className="hidden md:block">{isEdit? 'Update Food':'Create Food'}</span></button>
</form>
      </div>
   
  )
}
