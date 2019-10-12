import React from 'react';
import * as d3 from 'd3';
import { useD3 } from 'd3blackbox';

const Axis = ({ type, scale, tickSize, margins }) => {
  let axis = d3.axisTop(scale).tickSize(-tickSize).ticks(24).tickFormat(d3.timeFormat("%H:%M"));

  const anchorRef = useD3((anchor) => {
    d3.select(anchor).call(axis);
  });

  return (
    <g
      className={`axis axis-${type}`}
      ref={anchorRef}
      transform={`translate(0, ${margins.top})`}
    />
  );
};

export default Axis;
