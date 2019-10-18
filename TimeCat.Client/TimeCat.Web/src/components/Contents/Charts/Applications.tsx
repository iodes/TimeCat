import { ResponsivePieCanvas } from '@nivo/pie'
import { Avatar, Card, Col, List, Row, Typography } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { ApplicationsData } from './ApplicationsData'
const { Text } = Typography

const Container = styled(Card)`
  width: 900px;
  height: 380px;
`

const ContentsContainer = styled(Row)`
  width: 780px;
`

const PieContainer = styled(Col)`
  height: 320px;
`

const ListContainer = styled(Col)`
  height: 320px;
`

const Icon = styled(Avatar)`
  width: 15px;
  height: 15px;
`

const Name = styled(List.Item.Meta)`
  margin-left:10px;
  margin-top: 5px;
`

const Usage = styled(List.Item.Meta)`
  width: 20px;
  height: 20px;
`

const Applications: React.FC = () => {
  const [data, setData] = React.useState(ApplicationsData)
  return (
    <Container
      hoverable
      bordered={true}
    >
      <Text strong>Applications</Text>
      <ContentsContainer>
        <PieContainer span = {12}>
          <ResponsivePieCanvas
            data={data}
            margin={{top: 0, right: 0, bottom: 0, left: 0}}
            enableRadialLabels={false}
            pixelRatio={5}
            innerRadius={0.4}
            padAngle={0.3}
            cornerRadius={1}
            sliceLabel={'id'}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor={'#333333'}
            animate={true}
            motionStiffness={90}
            motionDamping-={15}
          />
        </PieContainer>
        <ListContainer span = {12}>
          <List
            size={'small'}
            dataSource={data}
            renderItem={(item) => (
              <List.Item style = {{padding: 0}}>
                <Icon src={item.src}/>
                <Name title={item.id}/>
                <Usage description={item.usage}/>
              </List.Item>
            )}
          />
        </ListContainer>
      </ContentsContainer>
    </Container>
  )
}

export default Applications
