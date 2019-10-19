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

const Time = styled('p')`
  margin-top: 30px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: #006fff;
`;

const Summary = styled('p')`
  font-size:14px;
  text-align: center;
`;

const Accent = styled('b')`
  color: #006fff;
`;

const Hour = styled('b')`
  color: #C6C7C8;
`;

const TotalTime = () => {
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Title strong>Total Time</Title>
      <Time>3h 42m</Time>
      <Summary>
        <Accent>28m</Accent> 
        <Hour> hour</Hour>
      </Summary>

    </Container>
  );
};
export default TotalTime;
