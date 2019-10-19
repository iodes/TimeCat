import * as React from 'react'
import { Card, Typography } from 'antd'
import { ResponsiveBar } from '@nivo/bar'
import { WeekdaysData } from './WeekdaysData'
import styled from 'styled-components'
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

const ProductiveWeekdays = () => {
  const [data, setData] = React.useState(WeekdaysData)
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Title strong>Most productive weekdays</Title>
      <BarContainer>
        <ResponsiveBar
          data={data}
          groupMode={'grouped'}
          keys={['value']}
          indexBy={'day'}
          colors={(d) => {
            return d.data.value >= 0 ? '#8fe563' : '#d05b55'
          }}
          margin={{top: 10, right: 0, bottom: 50, left: 0}}
          padding={0.1}
          enableLabel={false}
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={{tickSize: 0}}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={theme}
        />
      </BarContainer>
    </Container>
  )
}
export default ProductiveWeekdays
