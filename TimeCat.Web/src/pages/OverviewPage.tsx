import { Col, Row } from 'antd'
import 'antd/dist/antd.css'
import * as React from 'react'
import styled from 'styled-components'

const Container = styled('div')`
  background-color: #eeeeee;
`

const Content = styled(Col)`
  padding: 10;
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
                TotalTime
              </Content>
              <Content xs={8}>
                ActiveWeekdays
              </Content>
              <Content xs={8}>
                ActiveHours
              </Content>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Content xs={8}>
                Score
              </Content>
              <Content xs={8}>
                ProductiveWeekday
              </Content>
              <Content xs={8}>
                ProductiveHours
              </Content>
            </Col>
          </Row>
        </Col>
        <Content lg={12}>
          Stackedbar
        </Content>
      </Row>
      <Row>
        <Content lg={12}>
          Applications
        </Content>
        <Content lg={12}>
          Projects
        </Content>
      </Row>
    </Container>
  )
}

export default OverviewPage
