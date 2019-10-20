import React from 'react';
import CalendarTimeline from 'react-calendar-timeline';
// import 'react-calendar-timeline/lib/Timeline.css';
import '../assets/styles/Timeline.css';

import moment from 'moment';

const groups = [
  { id: 1, title: 'User', height: 40 },
  { id: 2, title: 'Project', height: 40 }
];

const items = [
  {
    id: 1,
    group: 1,
    title: 'Safari',
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
    backgroundColor: '#E8C1A0',
    icon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/1028px-Safari_browser_logo.png'
  },
  {
    id: 2,
    group: 2,
    title: 'Chrome',
    start_time: moment().add(1),
    end_time: moment().add(5, 'hour'),
    backgroundColor: '#98E3D5',
    icon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/512px-Google_Chrome_icon_%28September_2014%29.png'
  },
  {
    id: 3,
    group: 2,
    title: 'Visual Studio Code',
    start_time: moment().add(-5, 'hour'),
    end_time: moment().add(-1, 'hour'),
    backgroundColor: '#F1E15B',
    icon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Visual_Studio_Code_1.18_icon.svg/512px-Visual_Studio_Code_1.18_icon.png'
  }
];

const itemRenderer = ({
  item,
  timelineContext,
  itemContext,
  getItemProps,
  getResizeProps
}) => {
  itemContext.dimensions.height = 30;
  itemContext.selected = false;
  const backgroundColor = item.backgroundColor;
  return (
    <div
      {...getItemProps({
        style: {
          backgroundColor,
          border: 'none',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      })}
    >
      <img src={item.icon} style={{ width: '18px', height: '18px' }}></img>
    </div>
  );
};

const minTime = moment()
  .add(-12, 'hour')
  .valueOf();
const maxTime = moment()
  .add(+12, 'hour')
  .valueOf();

const onTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
  if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
    updateScrollCanvas(minTime, maxTime);
  } else if (visibleTimeStart < minTime) {
    updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart));
  } else if (visibleTimeEnd > maxTime) {
    updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime);
  } else {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  }
};

const Timeline = () => {
  return (
    <>
      <div style={{ backgroundColor: '#0F1416' }}>
        <CalendarTimeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
          canResize={false}
          canMove={false}
          minZoom={60 * 60 * 1000}
          maxZoom={60 * 60 * 1000 * 24}
          itemRenderer={itemRenderer}
          onTimeChange={onTimeChange}
        />
      </div>
    </>
=======
import * as React from 'react';
import Chart from 'chart.js';

import {
  scaleDefaults,
  scale,
  data,
  defaults,
  controller
} from '../assets/util/TimelineConfig';

Chart.scaleService.registerScaleType('timeline', scale, scaleDefaults);
Chart.controllers.timeline = Chart.controllers.bar.extend(controller);
Chart.defaults.timeline = defaults;

const Timeline = () => {
  let myTimeline;
  const chartRef = React.useRef();

  const buildChart = () => {
    const myChartRef = chartRef.current.getContext('2d');

    const config = {
      type: 'timeline',
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
    <div style={{ height: '150px' }}>
      <canvas id='myChart' ref={chartRef} />
    </div>
  );
};

export default Timeline;
