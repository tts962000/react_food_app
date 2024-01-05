import React,{useEffect, useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import useFirestore from '../Hooks/useFirestore';
export default function ReviewForm({type='create',setEditReview,editReview}) {
    let {id}=useParams();
    let [reviewBox,setReviewBox]=useState('');
    let {addCollection,updateDocument}=useFirestore();
    
    useEffect(() => {
        if (type === 'update') {
            setReviewBox(editReview.reviewBox);
        }
    }, [type])
    let submitReview=async(e)=>{
        e.preventDefault();
       if(type==='create'){
        let data={
            reviewBox,
            foodUid:id
        }
        await addCollection('reviews',data);
        setReviewBox('');
       }else{
        editReview.reviewBox=reviewBox; //important
        await updateDocument('reviews',editReview.id,editReview,false);
        setEditReview(null);
    }
        
    }
    // useEffect(()=>{
    //     if(type==='update'){
    //         setEditReview('WTF');
    //         // setEditReview(editReview.reviewBox);
    //     }
    // },[type])
   
  return (
    // <form onSubmit={createReview}>
    //               <textarea value={reviewBox} onChange={e=>setReviewBox(e.target.value)} name="" id="" className='p-3 shadow-md border-2 bg-gray-50 w-full' cols="30" rows="5"></textarea>
    //                 <button type='submit' className='flex text-white bg-primary px-3 py-2 rounded-lg my-3'>Add Note</button>
    //             </form> 
    <form onSubmit={submitReview} >
            <textarea value={reviewBox} onChange={e => setReviewBox(e.target.value)} className='p-3 shadow-md border-2 bg-gray-50 w-full' name="" id="" cols="30" rows="5"></textarea>
            <div className="flex">
            <button type='submit' className='text-white bg-primary px-3 py-2 rounded-lg my-3 flex items-center gap-1'>
                <span>{type==='create'? 'Add':'Update'} Note</span>
            </button>
            {type==='update' && <button type='button' onClick={()=>setEditReview(null)} className='ms-3 text-white bg-red-500 px-3 py-2 rounded-lg my-3'>Cancel</button> }
            </div>
        </form>
  )
}
