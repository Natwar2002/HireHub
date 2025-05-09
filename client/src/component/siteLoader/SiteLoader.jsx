import { useEffect, useState } from "react";
import {  Progress } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function SiteLoader() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

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
      navigate('/home');
    }
  },[navigate, value])

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <p className="absolute -translate-y-5">{value}</p>
      <Progress isIndeterminate aria-label="Loading..." className="max-w-full" size="sm" />
    </div>
  );
}
