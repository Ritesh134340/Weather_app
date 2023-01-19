import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import TimeArr from "./TimeArr";
import "./chart.styled.css"

const LineChart = ({data,options,timeArr}) => {
  return (
    <div className="lin-ch">
      <Line  data={data} options={options}/>
      <TimeArr timeArr={timeArr}/>
    </div>
  );
};

export default LineChart;