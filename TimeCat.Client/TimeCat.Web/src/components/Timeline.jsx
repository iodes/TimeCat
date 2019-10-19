import * as React from "react";
import Chart from "chart.js";

import {
  scaleDefaults,
  scale,
  data,
  defaults,
  controller
} from "../assets/util/TimelineConfig";

Chart.scaleService.registerScaleType("timeline", scale, scaleDefaults);
Chart.controllers.timeline = Chart.controllers.bar.extend(controller);
Chart.defaults.timeline = defaults;

const Timeline = () => {
  let myTimeline;
  const chartRef = React.useRef();

  const buildChart = () => {
    const myChartRef = chartRef.current.getContext("2d");

    const config = {
      type: "timeline",
      options: {
        showText: true,
        responsive: true,
        // zoom and pan
        // pan: {
        //   enabled: true,
        //   mode: "x"
        // },
        // zoom: {
        //   enabled: true,
        //   drag: false,
        //   mode: "x"
        //
        // events: ["mousemove"],
        maintainAspectRatio: false
      },
      data: data
    };

    // config.data.datasets.forEach((dataset, idx) => {
    //   // dataset.borderColor = randomColor(0.4);
    //   // dataset.backgroundColor = randomColor(0.5);
    //   // dataset.pointBorderColor = randomColor(0.7);
    //   // dataset.pointBackgroundColor = randomColor(0.5);
    //   // dataset.pointBorderWidth = 1;
    // });

    myTimeline = new Chart(myChartRef, config);
  };

  React.useEffect(() => {
    // Chart.plugins.register(zoom);
    buildChart();
  }, []);

  return (
    <div style={{ height: "150px" }}>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default Timeline;
