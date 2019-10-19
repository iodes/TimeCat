import { Card, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
const { Text } = Typography;

const Container = styled(Card)`
  width: 280px;
  height: 200px;
  background-color: #101417;
  .ant-card-body{
    padding: 15px;
  }
`;
const Title = styled(Text)`
  color: #C6C7C8;
`;

const Percent = styled('p')`
  margin-top: 30px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: #4bcd50;
`;
const Comment = styled('p')`
  font-size: 14px;
  text-align: center;
  color: #C6C7C8;
`;

const Score = () => {
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Title strong>Productivity Score</Title>
      <Percent>58%</Percent>
      <Comment>Keep it up 😀</Comment>
    </Container>
  );
};
export default Score;
