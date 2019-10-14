import React, { useState, useRef, useEffect } from 'react'
import Chart from 'chart.js';
let myTimeline;

/* Chart Options */
Chart.defaults.timeline = Chart.defaults.horizontalBar;
Chart.controllers.timeline = Chart.controllers.horizontalBar.extend({
  initialize: function () {
    return Chart.controllers.bar.prototype.initialize.apply(this, arguments);
  }
});

Chart.pluginService.register({
  beforeInit: function (chart) {
    if (chart.config.type === 'timeline') {
      var config = chart.config;

      var data = config.data.datasets[0].data;

      var min = new Date(data[0][0].getFullYear(), data[0][0].getMonth(), data[0][0].getDate());
      var max = new Date(data[0][0].getFullYear(), data[0][0].getMonth(), data[0][0].getDate() + 1);

      function toDate(date) {
        var date = new Date(date);
        var hour = date.getHours();
        var tt = ' AM';
        if (hour === 0) {
          hour = 12;
        }
        else if (hour === 12) {
          tt = ' PM';
        }
        else if (hour > 12) {
          hour = hour - 12;
          tt = ' PM';
        }
        return hour + ':' + ('0' + date.getMinutes()).replace(/.*(.{2})$/, '$1') + tt;
      }

      config.options.scales.xAxes[0].ticks.callback = toDate;
      config.options.scales.xAxes[0].ticks.min = min;
      config.options.scales.xAxes[0].ticks.max = max;
      config.options.scales.xAxes[0].ticks.fixedStepSize = 1000 * 60 * 60;
      config.options.scales.xAxes[0].ticks.minRotation = 90

      // create a dummy dataset with background color transparent ending at the start time
      config.data.datasets.unshift({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        data: data.map(function (e) {
          return e[0];
        })
      });

      config.data.datasets[1].data = data.map(function (e) {
        return e[1] - e[0];
      });
    }
  }
});
/* Chart Options */

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)'
};

const Timeline = () => {
  const chartRef = useRef();
  
  const buildChart = () => {
    const myChartRef = chartRef.current.getContext('2d');
    if (typeof myTimeline !== 'undefined') myTimeline.destory();

    const config = {
      type: 'timeline',
      data: {
        labels: ["Joe", "Jane", "Eve", "Adam", "Alice", "Bob"],
        datasets: [{
          backgroundColor: [
            chartColors.blue,
            chartColors.red,
            chartColors.green,
            chartColors.yellow,
            chartColors.orange,
            chartColors.purple
          ],
          data: [
            [new Date(2016, 0, 1, 0, 0), new Date(2016, 0, 1, 8, 30)],
            [new Date(2016, 0, 1, 4, 0), new Date(2016, 0, 1, 10, 30)],
            [new Date(2016, 0, 1, 14, 0), new Date(2016, 0, 1, 16, 30)],
            [new Date(2016, 0, 1, 8, 0), new Date(2016, 0, 1, 23, 45)],
            [new Date(2016, 0, 1, 14, 0), new Date(2016, 0, 1, 14, 30)],
            [new Date(2016, 0, 1, 16, 0), new Date(2016, 0, 1, 18, 30)],
          ]
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            categoryPercentage: 0.5,
            barPercentage: 1
          }]
        }
      }
    };

    myTimeline = new Chart(myChartRef, config);
  }

  useEffect(() => {
    buildChart();
  }, []);

  return (
    <canvas id="myChart" ref={chartRef}></canvas>
  )
}

export default Timeline;