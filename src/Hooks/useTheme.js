
import { ThemeContext } from '../contexts/ThemeContext'
import { useContext } from 'react'

export default function useTheme() {
    let context=useContext(ThemeContext);
    if(context==='undefined'){
        new Error('Theme context should be used only in themecontext provider');
    }
    return context;
}
