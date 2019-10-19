import React from 'react';
import Timeline from 'react-calendar-timeline';
import { createGlobalStyle } from 'styled-components';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';

const GlobalStyle = createGlobalStyle`
  div.rct-calendar-header {
    border: none;
  }

  div.rct-dateHeader .rct-dateHeader-primary {
    background-color: transparent;
    color: #e2e2e2;
  }

  div.rct-horizontal-lines {
    background-color: transparent;

    div.rct-hl-even, div.rct-hl-odd {
      border: none;
    }
  }

  div.react-calendar-timeline {
    .rct-dateHeader {
      background-color: transparent;
      border-left: 1px solid #bbb;
    }
    
    .rct-header-root {
      background-color: transparent;
    }
  }

  div.rct-items {
    height: 30px;
  }
`;

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
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour'),
    backgroundColor: '#98E3D5',
    icon:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/512px-Google_Chrome_icon_%28September_2014%29.png'
  },
  {
    id: 3,
    group: 2,
    title: 'Visual Studio Code',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
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
  return (
    <div
      {...getItemProps({
        style: {
          backgroundColor: item.backgroundColor,
          border: 'none',
          borderRadius: '5px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      })}
    >
      {/* {item.title} */}
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

const TimelineCalendar = () => {
  return (
    <>
      <GlobalStyle />
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
        />
      </div>
    </>
  );
};

export default TimelineCalendar;
