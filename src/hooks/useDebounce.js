import React,{useEffect,useState} from 'react'

const useDebounce= (value,delay) => {
  
   const [debounceValue,setDebounceValue]=useState(value)

    useEffect(()=>{
    let id= setTimeout(()=>{
      setDebounceValue(value)
     },delay)
     
     return ()=>{
        clearTimeout(id)
     }
    },[value,delay])

  return debounceValue
}

export default useDebounce
