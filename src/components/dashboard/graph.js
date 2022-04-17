import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js';
Chart.register (LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function Graph() {
  const [GraphData, setGraphData] = useState();
	const data = {
  labels: ['Jan', 'Mar', 'May', 'July', 'Oct'],
  datasets: [
    {
      data: [400, 1000, 4000, 800, 1500],
      fill: true,
      pointBorderColor:"rgb(33, 114, 229)",
      pointRadius:3,
      tension: 0.4
    },
  ],
};
const options = {
  plugins:{legend:{display:false}},
  scales: {
    y:{
      ticks:{
        color:"white",
        font:{
          size:12
        }
      },
    },
    x:{
      ticks:{
        color:"white",
        font:{
          size:12
        }
      }
    }
  },
};

  return (
    <div className="Graph-container">
	    <Line data={data} options={options}/>
    </div>
  )
}

