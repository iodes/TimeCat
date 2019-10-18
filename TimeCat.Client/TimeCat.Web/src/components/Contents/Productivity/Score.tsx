import { Card, Typography } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
const { Text } = Typography

const Container = styled(Card)`
  width: 260px;
  height: 180px;
`
const Percent = styled('p')`
  margin-top: 30px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  color: #4bcd50;
`
const Comment = styled('p')`
  font-size: 14px;
  text-align: center;
`

const Score: React.FC = () => {
  return (
    <Container
      hoverable
      bordered={true}
    >
      <Text strong>Productivity Score</Text>
      <Percent>58%</Percent>
      <Comment>Keep it up 😀</Comment>
    </Container>
  )
}
export default Score
