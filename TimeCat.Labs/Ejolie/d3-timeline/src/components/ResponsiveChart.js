import React, { useState, useMemo, useEffect } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import moment from 'moment';

import IntervalBar from './IntervalBar';
import Axis from './ResponsiveAxis';

const GroupLabel = styled.text`
  fill: #818181;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 6 00;
`;

const Chart = ({ chartData, svgDimensions }) => {
  const { width, height } = svgDimensions;

  const margins = { top: 20, right: 15, bottom: 20, left: 5 };
  const groupWidth = 200;
  let groupHeight = height / chartData.length; // 55;
  let intervalBarHeight = 0.8 * groupHeight;
  let intervalBarMargin = (groupHeight - intervalBarHeight) / 2 + margins.top;

  console.log('svg width: ', width, ' / svg height: ', height);
  console.log('intervalBarHeight: ', intervalBarHeight, ' / intervalBarMargin: ', intervalBarMargin)

  const [xScale, setXScale] = useState(() => d3
    .scaleTime()
    .domain([new Date(), new Date()])
    .nice(d3.timeDay)
    .range([groupWidth, width]));

  // const [prevWidth, setPrevWidth]= useState(width);

  // getDerivedStateFromProps
  // if (width !== prevWidth) {
  //   // width changed after last render. update it.
  //   setPrevWidth(width);
  //   resize();
  // }
  
  useEffect(() => {
    setXScale(() =>
      d3
        .scaleTime()
        .domain([new Date(), new Date()])
        .nice(d3.timeDay)
        .range([groupWidth, width])
    )
  }, [width])

  // resize function
  // function resize() {
  //   setXScale(
  //     d3
  //     .scaleTime()
  //     .domain([new Date(), new Date()])
  //     .nice(d3.timeDay)
  //     .range([groupWidth, prevWidth])
  //   )
  // }

  console.log('xScale');
  console.log(xScale)

  return (
    <g>
      {chartData.map((obj, idx) => {
        // temporary color palette
        const colors = d3.schemeSet3;

        const intervalBarGroup = obj.data.map((d, i) => {
          console.log('== intervalbar ==');
          console.log('d: ', d);
          console.log('d.to: ', d.to, ' / d.from: ', d.from);
          console.log('x: ', xScale(d.from), ' / y: ', intervalBarMargin);
          console.log('width: ', xScale(d.to) - xScale(d.from), ' / height: ', intervalBarHeight);
          return (
            <IntervalBar
              key={`interval-bar-${i}`}
              x={xScale(d.from)}
              y={intervalBarMargin}
              width={xScale(d.to) - xScale(d.from)}
              height={intervalBarHeight}
              color={colors[i]}
            />
          );
        });

        return (
          <>
            <line
              key={`group-section-${idx}`}
              className="group-section"
              x1="0"
              x2={width}
              y1={groupHeight * (idx + 1) + margins.top}
              y2={groupHeight * (idx + 1) + margins.top}
            ></line>
            <GroupLabel
              key={`group-label-${idx}`}
              className="group-label"
              x="0"
              y={groupHeight * idx + groupHeight / 2 + 5.5 + margins.top}
              dx="0.5em"
            >
              {obj.label}
            </GroupLabel>
            {intervalBarGroup}
          </>
        );
      })}
      <line
        x1={groupWidth}
        x2={groupWidth}
        y1="0"
        y2={height + margins.top}
        style={{ stroke: '#e6e6e6' }}
      ></line>
      <Axis type="top" tickSize={height} scale={xScale} margins={margins} />
    </g>
  );
};

export default Chart;
