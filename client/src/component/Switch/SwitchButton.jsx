import {Switch} from "@heroui/switch";
import { MoonIcon } from "./Moon";
import { SunIcon } from "./Sun";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";


export default function SwitchButton() {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme')=="dark")
    const { setTheme } = useTheme();

    useEffect(()=>{
      if(currentTheme){
        localStorage.setItem('theme','dark')
      }else{
        localStorage.setItem('theme','light')
      }
    },[currentTheme, setTheme]);

    useEffect(()=>{
      const getTheme = localStorage.getItem('theme');
      setTheme(getTheme)
    },[currentTheme, setTheme])
    
    return (
      <Switch
        defaultSelected
        color="secondary"
        endContent={<MoonIcon />}
        size="lg"
        startContent={<SunIcon />}
        isSelected={currentTheme}
        onChange={()=>setCurrentTheme((pre)=>!pre)}
      >
      </Switch>
    );
  }