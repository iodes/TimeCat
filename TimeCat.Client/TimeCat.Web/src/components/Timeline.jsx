import React from 'react';
import Timeline from 'react-calendar-timeline';
import { createGlobalStyle } from 'styled-components';
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
    start_time: moment().add(1.5),
    end_time: moment().add(4, 'hour'),
    backgroundColor: '#98E3D5',
    icon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/512px-Google_Chrome_icon_%28September_2014%29.png'
  },
  {
    id: 3,
    group: 2,
    title: 'Visual Studio Code',
    start_time: moment().add(-3, 'hour'),
    end_time: moment().add(1, 'hour'),
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
  console.log(itemContext);
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

const onItemSelect = (itemId, e, time) => {
  e.preventDefault();
  return;
};

const onItemClick = (itemId, e, time) => {
  e.preventDefault();
  return;
};

const Timeline = () => {
  return (
    <>
      <div style={{ backgroundColor: '#0F1416' }}>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
          // visibleTimeStart={moment().add(-12, 'hour')}
          // visibleTimeEnd={moment().add(12, 'hour')}
          canResize={false}
          canMove={false}
          minZoom={60 * 60 * 1000}
          maxZoom={60 * 60 * 1000 * 24}
          itemRenderer={itemRenderer}
          onTimeChange={onTimeChange}
          onItemSelect={onItemSelect}
          onItemClick={onItemClick}
        />
      </div>
    </>
  );
};

export default Timeline;
