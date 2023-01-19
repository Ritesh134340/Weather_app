import React from 'react'

const TimeArr = ({timeArr}) => {
  return (
    <div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        {
          timeArr && timeArr.map((ele,i)=><div key={i} style={{marginTop:"-10px",fontFamily:"sans-serif",letterSpacing:"0.7px"}}><p style={{fontWeight:"500",fontSize:"16px"}}>{ele}</p></div>)
        }
      </div>
    </div>
  )
}

export default TimeArr
