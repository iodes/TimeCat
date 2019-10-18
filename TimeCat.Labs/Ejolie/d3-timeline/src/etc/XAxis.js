import React from 'react';
import * as d3 from 'd3';
import { useD3 } from 'd3blackbox';

const XAxis = ({ margins, width, height }) => {
  let tickFormat = {
    format: d3.timeFormat('%I %p'),
    tickTime: d3.timeHours,
    tickInterval: 1,
    tickSize: 6,
    tickValues: null,
  };

  let beginning = 0;
  let ending = 0;

  let xScale = d3
    .scaleTime()
    .domain([beginning, ending])
    .range([margins.left, width - margins.right]);

  let axis = d3
    .axisBottom(xScale)
    .tickFormat(tickFormat.format)
    .tickSize(tickFormat.tickSize);

  // if (tickFormat.tickValues != null) {
  //   axis.tickValues(tickFormat.tickValues);
  // } else {
  //   axis.ticks(
  //     tickFormat.numTicks || tickFormat.tickTime,
  //     tickFormat.tickInterval
  //   );
  // }

  const anchorRef = useD3((anchor) => {
    d3.select(anchor).call(axis);
  });

  return (
    <g
      className={`axis axis-bottom`}
      ref={anchorRef}
      transform={`translate(${margins.left}, ${height})`}
    />
  );
};

export default XAxis;
