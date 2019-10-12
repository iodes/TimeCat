import React from 'react';
import * as d3 from 'd3';
import { useD3 } from 'd3blackbox';

const Axis = ({ x, y, type, scale }) => {
  const anchorRef = useD3((anchor) => {
    d3.select(anchor).call(d3[`axis${type}`](scale));
  });

  return <g ref={anchorRef} transform={`translate(${x}, ${y})`} />;
};

export default Axis;
₩