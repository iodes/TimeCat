import React, { useState, useMemo, useEffect } from 'react';
import * as d3 from 'd3';
import { useD3 } from 'd3blackbox';

import IntervalBar from './IntervalBar';

const Axis = ({ type, scale, tickSize, height }) => {
  let axis = d3.axisBottom(scale).tickSize(-tickSize);

  const anchorRef = useD3((anchor) => {
    d3.select(anchor).call(axis);
  });

  return (
    <g
      className={`axis axis-${type}`}
      ref={anchorRef}
      transform={`translate(0, ${height})`}
    />
  );
};

const Chart = ({ chartData, svgDimensions }) => {
  const margins = { top: 0, right: 0, bottom: 20, left: 0 };
  // const svgDimensions = { width: 900, height: 500 };
  const [width, setWidth] = useState(
    svgDimensions.width - margins.right - margins.left
  );

  const [height, setHeight] = useState(
    svgDimensions.height - margins.top - margins.bottom
  );

  console.log(`svgDimensions: ${svgDimensions.width}, ${svgDimensions.height}`);
  console.log(`width: ${width}, height: ${height}`);

  useEffect(() => {
    return () => {
      setWidth(svgDimensions.width - margins.right - margins.left);
      setHeight(svgDimensions.height - margins.top - margins.bottom);
    };
  }, [margins.bottom, margins.left, margins.right, margins.top, svgDimensions]);

  let groupWidth = 200;
  let groupHeight = height / chartData.length;

  let allElements = chartData.reduce((agg, e) => agg.concat(e.data), []);
  console.log(`allElements: ${allElements}`);

  let minDt = d3.min(allElements, (p) => p.from);
  let maxDt = d3.max(allElements, (p) => p.to);

  let xScale = d3
    .scaleTime()
    .domain([minDt, maxDt])
    .range([groupWidth, width]);

  // zoom
  // function zoomed() {}

  // let zoom = d3
  //   .zoom()
  //   .x(xScale)
  //   .on('zoom', zoomed);

  let intervalBarHeight = 0.8 * groupHeight;
  let intervalBarMargin = (groupHeight - intervalBarHeight) / 2;

  return (
    <svg
      width={svgDimensions.width + margins.right + margins.left}
      height={svgDimensions.height + margins.top + margins.bottom}
    >
      {chartData.map((obj, idx) => {
        const intervalBarGroup = obj.data.map((d, i) => {
          return (
            <IntervalBar
              key={`interval-bar-${i}`}
              x={xScale(d.from)}
              y={intervalBarMargin}
              width={xScale(d.to) - xScale(d.from)}
              height={intervalBarHeight}
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
              y1={groupHeight * (idx + 1)}
              y2={groupHeight * (idx + 1)}
            ></line>
            <text
              key={`group-label-${idx}`}
              className="group-label"
              x="0"
              y={groupHeight * idx + groupHeight / 2 + 5.5}
              dx="0.5em"
            >
              {obj.label}
            </text>
            {intervalBarGroup}
          </>
        );
      })}
      <line
        x1={groupWidth}
        x2={groupWidth}
        y1="0"
        y2={height}
        stroke="black"
      ></line>
      <Axis type="bottom" tickSize={height} scale={xScale} height={height} />
    </svg>
  );
};

export default Chart;
