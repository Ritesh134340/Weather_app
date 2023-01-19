import React, { useEffect, useRef, useState } from "react";
import "./top.styled.css";
import { BsColumnsGap, BsFillGeoAltFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import Bottom from "../components/Bottom"
import Mid from "../components/Mid"

const Top = () => {
 
  const [byName, setByName] = useState([]);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(city);
  const [state, setState] = useState("");
  const [daily,setDaily]=useState([])
  const [hourly,setHourly]=useState([])
  const [current,setCurrent]=useState({})
  const [searchObj,setSearchObj]=useState({})
  const [loading,setLoading]=useState(true)
  const [err,setErr]=useState(false)
  let  inputRef=useRef(null)

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
            setErr(false)
        } else if (result.state === 'denied') {
             setErr(true)
             setLoading(false)
        }
        else if (result.state === 'prompt') {
          setErr(true)
          setLoading(false)
           
        }
    });
    
}, [])

 
  const handleSearchData = (lat, lon, city, state) => {
    setSearch("")
    setCity(city);
    setState(state);
    inputRef.current.value=`${city}, ${state}`

    if (lat !== undefined && lon !== undefined) {
      
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=732475425b7e97886a290942df2956d4`
        )
        .then((res) => {
          setCurrent(res.data.current)
          setHourly(res.data.hourly)
          setDaily(res.data.daily)
        });
    }
  };

  useEffect(() => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(function (position) {
        

      axios
        .get(
          ` https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bd6366050c072c3267ef7bd63ce3e6e5`
        )
        .then((res) => {
          setLoading(false)
          setCity(res.data[0].name);
          setState(res.data[0].state);
         
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${res.data[0].lat}&lon=${res.data[0].lon}&units=metric&appid=732475425b7e97886a290942df2956d4`
            )
            .then((res) => {
              //first all data here...
              setCurrent(res.data.current)
              setHourly(res.data.hourly)
              setDaily(res.data.daily)
       
            });
        });
    });
  }, []);



  useEffect(() => {
   
    if (search !== "" ) {
      let id=setTimeout(()=>{
        axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=bd6366050c072c3267ef7bd63ce3e6e5`
        )
        .then((res) => {
        
         return (res.data)
        }).then((res)=>{
          setByName(res)
          res && res.map((ele)=>{
              axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${ele.lat}&lon=${ele.lon}&units=metric&appid=1578b7d60f853f119107d13e06526484`
              ).then((res)=>{
                 setSearchObj(res.data)
              })
             })
           
        })
       },1000)

       return ()=>{
          clearTimeout(id)
       }
    }
  }, [search]);


  return (
    
    loading?<div style={{width:"vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}> <h3>Loading...</h3></div> :err ? <div style={{width:"vw",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}> <h3>Please allow location...</h3></div>   : !err && !loading ?   <>
      <div className="main-top">
      
      <div>
        <BsFillGeoAltFill size="25px" />
        <input type="text" ref={inputRef} placeholder={(city) &&`${city}, ${state}`}  onChange={(e) => setSearch(e.target.value)} />
        <AiOutlineSearch size="25px" />
      </div>
      {byName.length > 0 && search && (
        <div
          className="search-box" >
          {byName.map((ele, i) => (
            <div
              key={i} onClick={() =>
                handleSearchData(ele.lat, ele.lon, ele.name, ele.state)
              } >
 
              <div>
                <span>{ele.name}</span>
                {(ele.name && ele.state) && ", "}
                <span>{ele.state}</span>
              </div>
 
              <div>
                <div>
                  <p>{(searchObj && searchObj.current)?searchObj.current.temp.toFixed(0) : ""}<span>&#176;</span></p>
                  <p>{(searchObj && searchObj.current)? searchObj.current?.weather[0]?.main : "cloudy"}</p>
                </div>
                <div>
                  <img src={ searchObj && `https://openweathermap.org/img/wn/${(searchObj && searchObj.current)?searchObj.current.weather[0].icon : "10d"}@2x.png`} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
      <Mid daily={daily}/>
      <Bottom current={current} hourly={hourly}/>
      </> : <h3>Please refresh...</h3>
    
  );
};

export default Top;
