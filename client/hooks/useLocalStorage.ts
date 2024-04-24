"use client";
import { useState, useEffect, ReactNode } from "react";

const PREFIX = "whats-clone-";

const useLocalStorage = (key: string, initialValue: any) => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    
    if(typeof window !== 'undefined'){
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue && jsonValue !== 'undefined') return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  }
  });
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue] as const;
};

export default useLocalStorage