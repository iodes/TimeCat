import React, { useState, useMemo, useEffect } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import moment from 'moment';

import IntervalBar from './components/IntervalBar';
import Axis from './components/Axis';

const GroupLabel = styled.text`
  fill: #818181;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 6 00;
`;

const Chart = ({ chartData, svgDimensions }) => {
  const margins = { top: 20, right: 15, bottom: 20, left: 5 };

  const [width, setWidth] = useState(
    svgDimensions.width - margins.right - margins.left
  );

  const [height, setHeight] = useState(
    svgDimensions.height - margins.top - margins.bottom
  );

  // console.log(`svgDimensions: ${svgDimensions.width}, ${svgDimensions.height}`);
  // console.log(`width: ${width}, height: ${height}`);

  useEffect(() => {
    return () => {
      setWidth(svgDimensions.width - margins.right - margins.left);
      setHeight(svgDimensions.height - margins.top - margins.bottom);
    };
  }, [margins.bottom, margins.left, margins.right, margins.top, svgDimensions]);

  let groupWidth = 200;
  let groupHeight = height / chartData.length;

  let xScale = d3
    .scaleTime()
    .domain([new Date(), new Date()])
    .nice(d3.timeDay)
    .range([groupWidth, width]);

  // zoom
  // function zoomed() {}

  // let zoom = d3
  //   .zoom()
  //   .x(xScale)
  //   .on('zoom', zoomed);

  let intervalBarHeight = 0.8 * groupHeight;
  let intervalBarMargin = (groupHeight - intervalBarHeight) / 2 + margins.top;

  return (
    <svg
      width={svgDimensions.width + margins.right + margins.left}
      height={svgDimensions.height + margins.top + margins.bottom}
    >
      {chartData.map((obj, idx) => {
        // temporary color palette
        const colors = d3.schemeSet3;
        
        const intervalBarGroup = obj.data.map((d, i) => {
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
    </svg>
  );
};

export default Chart;
