import React from 'react';
import * as d3 from 'd3';

import Axis from './Axis';

const Axes = ({ scales, margins, width, height }) => {
  const xProps = {
    type: 'Bottom',
    scale: scales.xScale,
    translate: `translate(${margins.left}, ${height})`,
    tickSize: height,
  };

  const yProps = {
    type: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width,
    ticks: 5,
  };

  // zoom
  // function zoomed() {
  //   svg.select('.x.axis').call(xAxis);
  // }

  // const zoom = d3
  //   .zoom()
  //   .x(0)
  //   .xExtent([new Date(-2000, 1, 1), new Date(3000, 1, 1)])
  //   .on('zoom', zoomed);

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  );
};

export default Axes;
