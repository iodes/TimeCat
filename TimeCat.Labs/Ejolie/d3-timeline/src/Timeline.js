import React, { useMemo } from 'react';
import * as d3 from 'd3';

import Axis from './Axis';

const Timeline = ({ x, y, width, height }) => {
  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 1])
        .range([0, width]),
    [width]
  );

  return (
    <g transform={`translate(${x}, ${y})`}>
      <Axis x={0} y={0} scale={yScale} type="Left" />
      <Axis x={0} y={height} scale={xScale} type="Bottom" />
    </g>
  );
};

export default Timeline;
