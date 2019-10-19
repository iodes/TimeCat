import { ResponsiveBar } from '@nivo/bar'
import { Card, Typography } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { WeekdaysData } from './WeekdaysData'
const { Text } = Typography

const Container = styled(Card)`
  width: 280px;
  height: 200px;
  background-color: #101417;
  .ant-card-body{
    padding: 15px;
  }
`

const Title = styled(Text)`
  color: #C6C7C8;
`

const BarContainer = styled('div')`
  height: 160px;
`
const theme = {
  axis: {
    ticks: {
      text: {
        'fill' : '#ffff'
      }
    }
  }
}


const ActiveWeekdays: React.FC = () => {
  const [data, setData] = React.useState(WeekdaysData)
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Title strong>Most active weekdays</Title>
      <BarContainer>
        <ResponsiveBar
          data={data}
          groupMode={'grouped'}
          keys={['data']}
          indexBy={'day'}
          margin={{top: 10, right: 0, bottom: 50, left: 0}}
          padding={0.1}
          colors={'#006fff'}
          enableLabel={false}
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={{
            tickSize: 0,
          }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={theme}
        />
      </BarContainer>
    </Container>
  )
}

export default ActiveWeekdays
