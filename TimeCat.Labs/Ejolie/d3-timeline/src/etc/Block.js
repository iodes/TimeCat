import React from 'react';
import styled from 'styled-components';

const Rect = styled.rect`
  fill: blue;
  stroke: blue;
`;

const Block = ({ x, y }) => {
  // tooltip on mouseover
  const onMouseOver = () => {};

  return <Rect onMouseOver={onMouseOver}></Rect>;
};

export default Block;
