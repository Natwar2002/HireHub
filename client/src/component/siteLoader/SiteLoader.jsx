import { useEffect, useState } from "react";
import {  Progress } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import store from '../../redux/store';

export default function SiteLoader() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { user, token } = store.getState().auth;

  useEffect(() => {
    const interval = setInterval(() => {
      if(value >= 100) {
        clearInterval(interval)
        return;
      }
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 200);
    return () => clearInterval(interval);
  }, [value]);

  useEffect(()=>{
    if(value===100) {
      if(user && token){
        navigate('/home');
      } else {
        navigate('/auth/signin')
      }
    }
  },[navigate, token, user, value])

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <p className="absolute -translate-y-5">{value}</p>
      <Progress isIndeterminate aria-label="Loading..." className="max-w-full" size="sm" />
    </div>
  );
}
