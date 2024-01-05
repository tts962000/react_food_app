import { useReducer } from "react";
import { createContext } from "react";
//themecontext
const ThemeContext=createContext();
let ThemeReducer=(state,action)=>{
    // switch("CHANGE_THEME"){
    //     case action.type:
    //         return {...state,theme:action.color}
    //         default: 
    //         return state;
    // }
    switch(action.type){
        case "CHANGE_THEME":
            return {...state,theme:action.color} //update original state
            default:
                return state;
    }
   
}
//themecontextprovider component
const ThemeContextProvider=({children})=>{ //component
    //default state || update state
    let[state,dispatch]=useReducer(ThemeReducer,{ //reducerfunction || default data 
        theme:'light'
    })
    // let changeTheme=()=>{
    //     dispatch({type:"CHANGE_THEME",color:"dark"}); 
    // }
    let changeTheme=(theme)=>{
        dispatch({type:"CHANGE_THEME",color:theme}); 
    }
    const isDark=state.theme==='dark'
    return(
     <ThemeContext.Provider value={{...state,changeTheme,isDark}}>
           {children}
    </ThemeContext.Provider>
    )
 }

export {ThemeContext,ThemeContextProvider}