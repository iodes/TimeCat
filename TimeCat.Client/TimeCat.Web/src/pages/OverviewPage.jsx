import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import styled from 'styled-components';
import ActiveHours from '../components/Contents/Activity/Hours';
import TotalTime from '../components/Contents/Activity/TotalTime';
import ActiveWeekdays from '../components/Contents/Activity/Weekdays';
import Applications from '../components/Contents/Charts/Applications';
import Projects from '../components/Contents/Charts/Projects';
import Stacked from '../components/Contents/Charts/Stacked';
import ProductiveHours from '../components/Contents/Productivity/Hours';
import Score from '../components/Contents/Productivity/Score';
import ProductiveWeekdays from '../components/Contents/Productivity/Weekdays';

const Container = styled('div')`
  background-color: #191e23;
`;

const Content = styled(Col)`
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const OverviewPage = () => {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <Row>
            <Col xs={24}>
              <Content xs={8}>
                <TotalTime/>
              </Content>
              <Content xs={8}>
                <ActiveWeekdays/>
              </Content>
              <Content xs={8}>
                <ActiveHours/>
              </Content>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Content xs={8}>
                <Score/>
              </Content>
              <Content xs={8}>
                <ProductiveWeekdays/>
              </Content>
              <Content xs={8}>
                <ProductiveHours/>
              </Content>
            </Col>
          </Row>
        </Col>
        <Content lg={12}>
          <Stacked/>
        </Content>
      </Row>
      <Row>
        <Content lg={12}>
          <Applications/>
        </Content>
        <Content lg={12}>
          <Projects/>
        </Content>
      </Row>
    </Container>
  );
};

export default OverviewPage;
