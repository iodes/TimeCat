import { Card, Typography } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
const { Text } = Typography

const Container = styled(Card)`
  width: 260px;
  height: 180px;
`
const Time = styled('p')`
  margin-top: 30px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: #006fff;
`

const Summary = styled('p')`
  font-size:14px;
  text-align: center;
`

const Accent = styled('b')`
  color: #006fff;
`

const TotalTime: React.FC = () => {
  return (
    <Container
      hoverable
      bordered={true}
    >
      <Text strong>Total Time</Text>
      <Time>3h 42m</Time>
      <Summary>
        <Accent>28m</Accent> hour
      </Summary>

    </Container>
  )
}
export default TotalTime
