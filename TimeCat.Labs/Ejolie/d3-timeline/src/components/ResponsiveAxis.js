import React from 'react';
import * as d3 from 'd3';
import { useD3 } from 'd3blackbox';

const Axis = ({ type, scale, tickSize, margins }) => {
  const tickWidth = 60; // how much room you want for each tick
  const width = scale.range()[1]; // read the width from scale.range
  const tickN = Math.floor(width / tickWidth); // use division to decide how many ticks fit
  const keepEveryNth = Math.floor(scale.domain().length / tickN); // Some more division to decide every Nth tick you can keep 
  const timeFormat = d3.timeFormat("%H:%M");

  // 기존 axis
  let axis = d3.axisTop(scale)
               .tickSize(-tickSize)
               .ticks(24)
               .tickFormat(timeFormat);
  console.log('================ Axis ================')
  console.log('scale.range(): ', scale.range(), '/ width: ', width);
  console.log('tickSize: ', tickSize);
  console.log('tickN: ', tickN);
  console.log('keepEveryNth: ', keepEveryNth);
  

  // scale.domain(scale.domain().filter((_, i) => i % keepEveryNth === 0))

  // let axis = d3.axisTop(scale)
  //   .tickSize(-tickSize)
  //   .ticks(tickN)
  //   .tickFormat(timeFormat);

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
