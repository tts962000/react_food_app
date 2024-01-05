import React, { useContext } from "react";
// import { useContext } from "react";
import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../Hooks/useTheme";
import lightIcon from '../assets/light.svg';
import darkIcon from '../assets/dark.svg';
import useSignOut from "../Hooks/useSignOut";
import { AuthContext } from "../contexts/AuthContext";
// import {ThemeContext} from "../contexts/ThemeContext.jsx";
export default function NavBar() {
    let params=new URLSearchParams(location.search);//default method
  let searchValue=params.get('search');
    let [search,setSearch]=useState(searchValue);
    let navigate=useNavigate();
    let searchHandler=()=>{
        // e.preventDefault();
        navigate('/?search='+search)//important!
        // console.log(search);
    }
    // let {theme}=useContext(ThemeContext)
    let {isDark,changeTheme}=useTheme()
    console.log(isDark);
    let {logOut}=useSignOut();
    let logOutHandler=async()=>{
        await logOut();
        navigate('/login');
    }
    let {user}=useContext(AuthContext);
    // console.log(user);
    
    // console.log(theme);
    return (
        // <nav onClick={changeTheme} className={`border-b-2 mt-2 ${theme==='dark'? 'bg-black':'bg-orange-500'}`}>
            <nav className={`border-b-2 mt-2 ${isDark? 'bg-dbg border-primary' : 'bg-white'}`}>
            <ul className="mb-2 flex justify-between max-w-6xl mx-auto items-center">
                <li className="flex items-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${isDark? 'text-white':''}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>

                    <input value={search}
                        onChange={e=>setSearch(e.target.value)}
                        type="text"
                        className="outline-none px-2 py-1 rounded-lg"
                        placeholder="Search Foods"
                    ></input>
                    <button
                        onClick={searchHandler}
                        className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full"
                    >
                        

                        <span className="hidden md:block">Search</span>
                    </button>
                </li>
                <Link to="/" className="flex items-center gap-3 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${isDark? 'text-white':''}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>

                    <span className="text-2xl font-bold text-primary hidden md:block">Food Menus</span>
                </Link>
                <li className="flex gap-3 items-center">
                    <Link
                        to="/create"
                        className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded-full"
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

                        <span className="hidden md:block">Create Food</span>
                    </Link>
                    <div className="w-11">
                        <img
                            className="w-full rounded-full"
                            src="https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/411877802_381864387846917_1360021853948977326_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=_E75mVz4dLwAX-Znh71&_nc_ht=scontent-nrt1-1.xx&oh=00_AfBU6Bh_Xjye2lSw1gUggGS_h9WYuO0sNmq5YLCswgx4Sg&oe=658C26A6"
                        ></img>
                    </div>
                    {/* <div>
                        {theme ==='light' && <img src={darkIcon} className="w-8" onClick={()=>changeTheme('dark')}></img>}
                        {theme ==='dark' && <img src={lightIcon} className="w-8" onClick={()=>changeTheme('light')}></img>}
                    </div> */}
                      {/* <div className='cursor-pointer'>
                        {theme === 'dark' && <img src={lightIcon} alt="" className='w-8' onClick={() => changeTheme('light')} />}
                        {theme === 'light' && <img src={darkIcon} alt="" className='w-8' onClick={() => changeTheme('dark')} />}
                    </div> */}
                    <div className='cursor-pointer'>
                        {isDark && <img src={lightIcon} alt="" className='w-8' onClick={() => changeTheme('light')} />}
                        {!isDark  && <img src={darkIcon} alt="" className='w-8' onClick={() => changeTheme('dark')} />}
                    </div>
                    
                    <div className="space-x-3">
                        {!user &&
                        <>
                            <Link to="/login" className="bg-green-500 rounded-lg p-2">LogIn</Link>
                        <Link to="/register" className="bg-blue-500 rounded-lg p-2">Register</Link>
                        </>
                        }
                        {!!user && <button onClick={logOutHandler} type="submit" className="bg-red-500 rounded-lg p-2">LogOut</button>}
                    </div>
                </li>
            </ul>
        </nav>
    );
}
