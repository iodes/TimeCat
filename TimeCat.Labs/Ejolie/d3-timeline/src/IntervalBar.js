import React from 'react';
import styled from 'styled-components';

const Bar = styled.rect`
  fill: gray;
`;

const IntervalBar = ({ x, y, width, height }) => {
  // tooltip
  const onMouseOver = () => {};

  console.log('== IntervalBar ==');
  console.log('x ', x);
  console.log('y ', y);
  console.log('width ', width);
  console.log('height ', height);

  return (
    <Bar x={x} y={y} width={width} height={height} onMouseOver={onMouseOver} />
  );
};

export default IntervalBar;
