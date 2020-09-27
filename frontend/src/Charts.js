import React, {Component} from 'react';
import Chart from 'chart.js';


// Generate Sales Data
function createData(time, mood) {
  return { time, mood };
}

function createChart(ref, data){
  return new Chart(ref, {
    // The type of chart we want to create
    type: 'line',

      // The data for our dataset
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        datasets: [
          {
            label: "Mood",
            data: [1,2,9,4,5,6],
            borderColor: 'rgb(59, 89, 152)',
            fill: true,
          }
        ]
    },

      // Configuration options go here
    options: {
      responsive:true,
      maintainAspectRatio: false,
    }
  });
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default class Charts extends Component {
  chartRef = React.createRef();

  componentDidMount(){
    const myChartRef = this.chartRef.current.getContext("2d")
    
    createChart(myChartRef, 0)
  }

  render(){
    return (
      <canvas id="myChart" ref={this.chartRef}>
  
      </canvas>
    );
  }
}