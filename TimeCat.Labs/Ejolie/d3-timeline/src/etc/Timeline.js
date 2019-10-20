import React, { useMemo, useState } from 'react';
import * as d3 from 'd3';

import Axes from './Axes';
import XAxis from './XAxis';

const Timeline = ({ data }) => {
  const margins = { top: 30, right: 30, bottom: 30, left: 50 };
  const svgDimensions = { width: 900, height: 500 };

  const [width, setWidth] = useState(
    svgDimensions.width - margins.right - margins.left
  );
  const [height, setHeight] = useState(
    svgDimensions.height - margins.top - margins.bottom
  );

  // event handler
  const onWheel = () => {
    console.log('hello');
  };

  // scale
  let xScale = useMemo(
    () =>
      d3
        .scaleTime()
        .domain([new Date(2019, 10, 10), new Date(2019, 10, 11)])
        .range([0, width]),
    [width]
  );

  let yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, height])
        .range([height, 0]),
    [height]
  );

  return (
    <svg width={svgDimensions.width} height={svgDimensions.height}>
      {/* <Axes
        scales={{ xScale, yScale }}
        margins={margins}
        width={width}
        height={height}
      /> */}
      <XAxis width={width} height={height} margins={margins} />
    </svg>
  );
};

export default Timeline;
