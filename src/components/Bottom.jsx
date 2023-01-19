import React from 'react'
import "./bottom.styled.css"
import sun from "../images/sun.png"
import LineChart from "../components/LineChart"

const Bottom = ({current,hourly}) => {
 
   let imgLink;
  if(current && current.weather){
   let  icon=current?.weather[0]?.icon
    imgLink=`https://openweathermap.org/img/wn/${icon}@2x.png`
  }

 
  let   time=new Date()
        time=time.toTimeString();
        time=time.split(":")
      let hr=+time[0]
      let timeArr=[]

      for(let i=hr;i<hr+6;i++){
        if(i<=12){
          timeArr.push(i+"am")
        }
        else{
          timeArr.push((i-12)+"pm")
        }
     
      }

      let hourly1=hourly.slice(hr,hr+6)
      
      let mapped=hourly1 && hourly1.map((ele)=>{
        return ele.temp.toFixed(0)
      })

      let lab=hourly1 && hourly1.map((ele)=>{
        return ele.temp.toFixed(0)+String.fromCharCode(176)
      })
     





  const options1 = {
    plugins: {
        legend: {
            display:false,
         
        }
    },
    pointRadius: 4,
    pointSize: 20,
    scales: {
        x: {
            grid: {
                display: true
            },
            ticks: {
              color:"black",
             font:{
              size:15,
              family:"sans-serif",
              weight:900
             }
          },
          
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                display: false,
               
            }
        }
        
    }
}


const data1 = {
  labels: lab,
  datasets: [
    {
      backgroundColor: "white",
      borderWidth:3,
      borderColor: "rgb(74,176,235)",
      data:mapped
    },
  ],
};


const options2 = {
  plugins: {
    legend: {
        display: false
    }
},
scales: {
    x: {
        grid: {
            display: true
        }

    },
    y: {
        grid: {
            display: false
        },
        ticks: {
            display: false,
        }
    }
}
}



const data2 = {
labels:["6am","1pm","8pm"],
datasets: [
  {
     
      fill: true,
      lineTension: 0.4,
      backgroundColor: '#fbdb9d',
      borderColor: '#eee',
      borderWidth: 2,
      data: [0, 7, 0]
  }
]
};




  return (
    <div className="main-bottom">
      <div>
         <div>
          <h1>{current?.temp?.toFixed(0)}</h1>
           <span>&#176;C</span>
          <img src={imgLink?imgLink:sun}></img>
        </div>
      </div>
      <div>
        <LineChart data={data1} options={options1} timeArr={timeArr}/>
      </div>
      
      <div>
        <div>
          <p>Pressure</p>
          <p>{current.pressure} hpa</p>
        </div>
        <div>
          <p>Humidity</p>
          <p>{current.humidity} %</p>
        </div>
      </div>
      <div className="rise">
          <div>
          <p>Sunrise</p>
          <p>{new Date(current.sunrise*1000).toLocaleString('en-US', { hour: 'numeric', hour12: true })}</p>
          </div>
          <div>
          <p>Sunset</p>
          <p>{new Date(current.sunset*1000).toLocaleString('en-US', { hour: 'numeric', hour12: true })}</p>
          </div>
        
      </div>
      <div className="bottom-graph">
      <LineChart  data={data2} options={options2} />
      </div>
    </div>
  )
}

export default Bottom
