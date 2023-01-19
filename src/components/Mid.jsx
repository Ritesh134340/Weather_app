import React, { useEffect,useState } from 'react'

import "./mid.styled.css"

const Mid = ({daily}) => {
  
  const d = new Date();
  let day1 = d.toLocaleString('en-us', {weekday: 'long'});  
  day1=(day1.split("").slice(0,3).join(""))

  let day=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  let mappedArr=[]
  for(let i=0;i<day.length;i++){
    if(day[i]===day1){
    let count=0;
    let left=i
    while(left<day.length){
      mappedArr.push(day[left]);
      count++;
      left++;
      
    }
    
     if(count<8){
      let left=0;
      while(count<8){
         mappedArr.push(day[left]);
         left++;
         count++;
      }
     }

    }
  }

  return (
    <div className='main-mid'>
     
      <div className="mid-daily-wrapper">
      
          { 
           daily && daily.map((ele,index)=>
           <div key={index}>
           <p>{mappedArr[index]}</p>
           <div className='degree'>
           <p>{ele.temp.max.toFixed(0)}<span>&#176;</span></p>
           <p>{ele.temp.min.toFixed(0)}<span>&#176;</span></p>
           </div>
           <img src={`https://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`} alt="" />
           <p>{ele.weather[0].main}</p>
          </div>)
           }

      </div>
      
    </div>
  )
}

export default Mid
