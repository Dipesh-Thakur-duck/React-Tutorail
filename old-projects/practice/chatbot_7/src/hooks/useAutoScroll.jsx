import { useRef, useEffect } from 'react';

export function useAutoScroll(dependencies){
  const elementRef = useRef(null);

  useEffect(()=>{
    const element = elementRef.current;

    if(element){
      element.scrollTop = element.scrollHeight;
    }
  }, dependencies);

  return elementRef;
}