import { ResponsiveBar } from '@nivo/bar'
import { Card, Typography } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { HoursData } from './HoursData'
const { Text } = Typography

const Container = styled(Card)`
  width: 260px;
  height: 180px;
`

const BarContainer = styled('div')`
  height: 160px;
`

const ActiveHours: React.FC = () => {
  const [data, setData] = React.useState(HoursData)
  return (
    <Container
      hoverable
      bordered={true}
    >
      <Text strong>Most active hours</Text>
      <BarContainer>
        <ResponsiveBar
          data={data}
          keys={['-2','-1','0','1','2','3']}
          indexBy="label"
          margin={{top: 10, right:0, bottom: 50, left: 0}}
          padding={0.1}
          groupMode={'grouped'}
          axisTop={null}
          colors={'#006fff'}
          innerPadding={2}
          axisRight={null}
          axisBottom={{ tickSize: 0 }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          enableGridY={false}
        />
      </BarContainer>
    </Container>
  )
}

export default ActiveHours
