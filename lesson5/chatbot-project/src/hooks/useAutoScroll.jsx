import { useEffect, useRef } from 'react';

export function useAutoScroll(dependencies){
  const elementRef = useRef(null);
  useEffect(()=>{
    const containerElem = elementRef.current;
    if(containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);
  return elementRef;
}
