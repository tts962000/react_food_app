import React, { useState } from 'react'
import useFirestore from '../Hooks/useFirestore'
import {useParams} from 'react-router-dom';
import moment from 'moment';
import trash from '../assets/delete.svg';
import pencil from '../assets/edit.svg';
import ReviewForm from './ReviewForm';
import useTheme from '../Hooks/useTheme';
export default function ReviewList() {
    let {id}=useParams();
    let {getCollection,deleteDocument}=useFirestore();
    let {data:review}=getCollection('reviews',['foodUid','==',id]);
    let deleteReview=async(id)=>{
        await deleteDocument('reviews',id);
    }
    let [editReview,setEditReview]=useState(null);
    let {isDark}=useTheme();
    return (
   !!review.length && 
   (review.map(review=>(
    <div key={review.id} className="border-2 shadow-md p-3 my-3">
    <div className="flex items-center justify-between">
      <div className="flex space-x-2 items-center">
      <img src="https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/412482959_383142604385762_5913044807210894444_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=FYlMN9pFCkoAX-BAFzt&_nc_ht=scontent-nrt1-1.xx&oh=00_AfDfvBnl3DSt8k8UwZgB4PgE-j-wk6Z8JUhdKqQfUNKe9Q&oe=65997FB6" className='w-12 h-12 rounded-full' alt="" />
        <div className={isDark? 'text-white':''}>
        <h3>TTS</h3>
        <div className="text-sm text-gray-500">{moment(review?.date?.seconds*1000).fromNow()}</div>
        </div>
      </div>
      <div className="flex space-x-1 cursor-pointer">
            <img onClick={()=>deleteReview(review.id)} src={trash} alt="" />
            <img onClick={()=>setEditReview(review)} src={pencil} alt="" />
      </div>
    </div>
   <div className={`flex justify-start ms-3 py-3 ${isDark? 'text-white':''}`}>
    {editReview?.id!=review.id && review.reviewBox}
    </div>
    {editReview?.id===review.id && <ReviewForm type="update" editReview={editReview} setEditReview={setEditReview}/>}
    </div>
   )))
  )
}
