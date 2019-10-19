import { ResponsiveBar } from '@nivo/bar'
import { Card, Select, Typography } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { StackedData } from './StackedData'
const { Option } = Select
const { Text } = Typography

const Container = styled(Card)`
  width: 900px;
  height: 420px;
  background-color: #101417;
  .ant-card-body{
    padding: 15px;
  }
`

const BarContainer = styled('div')`
  height: 360px;
`

const Based = styled(Select)`
  width: 150px;
  .ant-select-selection{
    border: 0px;
    background-color: #545657;
    color: #ffffff;
  }
`

const Per = styled(Text)`
  margin-left: 5px;
  margin-right: 5px;
  color: #C6C7C8;
`

const Unit = styled(Select)`
  width: 80px;
  .ant-select-selection{
    border: 0px;
    background-color: #545657;
    color: #ffffff;
  }
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

const Stacked: React.FC = () => {
  const [data, setData] = React.useState(StackedData)
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Based
        size={'small'}
        defaultValue={'Time per Project'}
      >
        <Option value = {'Time per Project'}>Time per Project</Option>
        <Option value = {'Productivity Score'}>Productivity Score</Option>
      </Based>
      <Per strong>per</Per>
      <Unit
        size={'small'}
        defaultValue={'Day'}
      >
        <Option value={'Hour'}>Hour</Option>
        <Option value={'Day'}>Day</Option>
        <Option value={'Week'}>Week</Option>
        <Option value={'Month'}>Month</Option>
        <Option value={'Year'}>Year</Option>
      </Unit>
      <BarContainer>
        <ResponsiveBar
          data={data}
          keys={['Web Browsing', 'Development', 'Media', 'Unassigned', 'News', 'Social Media']}
          indexBy={'period'}
          margin={{top: 50, right: 0, bottom: 50, left: 0}}
          padding={0.3}
          enableGridX={false}
          enableGridY={false}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{tickSize: 0}}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={theme}
        />
      </BarContainer>
    </Container>
  )
}
export default Stacked
