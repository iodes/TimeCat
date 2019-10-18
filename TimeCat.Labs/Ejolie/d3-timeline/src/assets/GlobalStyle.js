import { createGlobalStyle } from 'styled-components';
import 'typeface-open-sans';

export default createGlobalStyle`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Open Sans';
  }

  body > section {
    height: 100%;
    width: 100%;
  }

  svg {
    background: #fff;
    border-radius: 5px;
    border: 1px solid #818181;
  }

  line {
    stroke: #e6e6e6;
  }

  .tick text {
    fill: #383838;
  }

  /* .axis line{
    stroke: red;
  } */

  .axis path{
    stroke: none;
  }

  .axis text{
    fill: #383838;
  }
  

  /* Tiny Flex Grid */
  [flex] {
    display: flex;
  }
  [flex-fill] {
    flex: 1;
  }
  [flex-full-center] {
    align-items: center;
    justify-content: center;
  }
  [flex-direction='column'] {
    flex-direction: column;
  }
  [flex-direction='row'] {
    flex-direction: row;
  }
  [flex-size='40'] {
    flex: 40;
  }
  [flex-size='60'] {
    flex: 60;
  }

`;
