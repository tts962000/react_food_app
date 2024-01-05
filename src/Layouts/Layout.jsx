import React from 'react'
import NavBar from '../Components/NavBar'
import {Outlet,useLocation} from 'react-router-dom'
import useTheme from '../Hooks/useTheme'
import { useEffect } from 'react';
import { SwitchTransition,CSSTransition } from 'react-transition-group';
import './styles.css';
export default function Layout() {
  const location=useLocation();
  console.log(location.pathname);
  let{isDark}=useTheme();
  useEffect(()=>{
    let body=document.body;

    if(isDark){
      body.classList.add('bg-dbg');
    }else{
      body.classList.remove('bg-dbg');
    }
  },[isDark])

    return (
        <>
         <div className={isDark? 'bg-dbg' :'bg-white'}>
         <NavBar/>
         <SwitchTransition>
          <CSSTransition timeout={200} classNames='fade' key={location.pathname}>
          <div className='max-w-6xl mx-auto items-center'>
                <Outlet/>
         </div>
          </CSSTransition>
         </SwitchTransition>
         </div>
        </>
      )
}
