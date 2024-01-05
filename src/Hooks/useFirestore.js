import React, { useRef } from 'react'
import {serverTimestamp,where,collection,onSnapshot,addDoc,updateDoc, orderBy,query,doc,getDoc,deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { useState,useEffect } from 'react';
export default function useFirestore() {
   let getCollection=(colName,_q,search)=>{
    let qRef=useRef(_q).current;
    let [error,setError]=useState('');
    let [loading,setLoading]=useState(false);
    let [data,setData]=useState([]);
    useEffect(()=>{
        setLoading(true);
        let ref=collection(db,colName);
        //Alphabetical Order Bug Fix
        let querires=[];
        if(qRef){
            querires.push(where(...qRef));
        }
        querires.push(orderBy('date','desc'));
        let q=query(ref,...querires);
        onSnapshot(q,docs=>{
            if(docs.empty){
                setError('Data cannot be fetched');
                setLoading(false);
                setData([]);
            }else{
                let collectionData=[];
                docs.forEach(doc=>{
                    let document={id:doc.id,...doc.data()}
                    collectionData.push(document);
                })
                if(search?.field && search?.value){
                    let searchedData=collectionData.filter(doc=>{
                        return doc[search?.field].includes(search?.value)
                    })
                    setData(searchedData);
                }else{
                    setData(collectionData);
                }
                setError('');
                setLoading(false);
            }
        })
    },[qRef,search?.field,search?.value])
    return {error,loading,data}
    }
    let getDocument=(id)=>{
        let [error,setError]=useState('');
    let [loading,setLoading]=useState(false);
    let [data,setData]=useState(null);
        useEffect(()=>{
            setLoading(true);
            let ref=doc(db,'foods',id);
            onSnapshot(ref,doc=>{
              // console.log(doc.exists());
              if(doc.exists()){
                let document={id:doc.id,...doc.data()}
                setData(document);
                setLoading(false);
                setError('');
              }else{
                setError('No Data Found!');
                setLoading(false);
              }
              // console.log(doc.id);
              // console.log(doc.data());
              
            });
          },[id])
          return{data,loading,error}
    }
    // let addCollection=async(colName,data)=>{
    //     data.date = serverTimestamp();
    //     let ref=collection(db,colName);
    //     return addDoc(ref,data);
    // }
    let addCollection = async (colName,data) => {
        data.date=serverTimestamp();
        let ref = collection(db, colName);
        return addDoc(ref, data);
    }
    let deleteDocument=async (colName,id)=>{
        let ref=doc(db,colName,id);
        return deleteDoc(ref);
    }
    let updateDocument=async(colName,id,data,updateDate=true)=>{
        if(updateDate){
            data.date = serverTimestamp();
        }
        let ref=doc(db,colName,id);
        return updateDoc(ref,data);
    }

    return {getCollection,getDocument,addCollection,deleteDocument,updateDocument}
}
