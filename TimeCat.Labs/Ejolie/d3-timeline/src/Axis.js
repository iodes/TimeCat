import React from 'react';
import * as d3 from 'd3';
import { useD3 } from 'd3blackbox';

const Axis = ({ ticks, translate, type, scale, tickSize }) => {
  let axis = d3[`axis${type}`](scale).tickSize(-tickSize);

  console.log(ticks);
  if (ticks) {
    axis = axis.ticks(ticks);
  }

  const anchorRef = useD3((anchor) => {
    d3.select(anchor).call(axis);
  });

  return (
    <g className={`axis axis-${type}`} ref={anchorRef} transform={translate} />
  );
};

export default Axis;
