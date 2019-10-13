import React from 'react';
import styled from 'styled-components';

const Bar = styled.rect`
  fill: ${props => props.color};
`;

const IntervalBar = ({ x, y, width, height, color }) => {
  // tooltip
  const onMouseOver = () => {};

  console.log('############ IntervalBar #############');
  console.log('x ', x);
  console.log('width ', width);

  return (
    <Bar x={x} y={y} width={width} height={height} onMouseOver={onMouseOver} color={color}/>
  );
};

export default IntervalBar;
