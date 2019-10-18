import { Col, Row } from 'antd'
import 'antd/dist/antd.css'
import * as React from 'react'
import styled from 'styled-components'
import ActiveHours from '../components/contents/Activity/Hours'
import TotalTime from '../components/contents/Activity/TotalTime'
import ActiveWeekdays from '../components/contents/Activity/Weekdays'
import ProductiveHours from '../components/contents/Productivity/Hours'
import Score from '../components/contents/Productivity/Score'
import ProductiveWeekdays from '../components/contents/Productivity/Weekdays'
import Applications from '../components/contents/Charts/Applications'
import Projects from '../components/contents/Charts/Projects'
import Stacked from '../components/contents/Charts/Stacked'

const Container = styled('div')`
  background-color: #eeeeee;
`

const Content = styled(Col)`
  padding: 10px;
  display: flex;
  justify-content: center;
`

const OverviewPage: React.FC = () => {
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
  )
}

export default OverviewPage
