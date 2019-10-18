import { ResponsivePieCanvas } from '@nivo/pie'
import { Card, Col, Icon, Row, Tree, Typography } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { ProjectsData } from './ProjectsData'
const { TreeNode } = Tree
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

const TreeContainer = styled(Col)`
  height: 320px;
`

const Node = styled(TreeNode)`
  border-bottom: 1px solid #e7e7e7;
  padding: 2px;
`

const NodeIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`

const Projects: React.FC = () => {
  const [data, setData] = React.useState(ProjectsData)
  return (
    <Container
      hoverable
      bordered={true}
    >
      <Text strong>Projects & Tasks</Text>
      <ContentsContainer>
        <PieContainer span={12}>
          <ResponsivePieCanvas
            data={data}
            margin={{top: 0, right: 0, bottom: 0, left: 0}}
            enableRadialLabels={false}
            pixelRatio={5}
            innerRadius={0.4}
            padAngle={0.3}
            cornerRadius={1}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </PieContainer>
        <TreeContainer span={12}>
          <Tree showIcon>
            <Node
              icon = {
                <NodeIcon
                  style={{backgroundColor: '#eebc85'}}
                />
              }
              title={'Sample Projects'}
              key={'0-0'}
            >
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#faef89'}}
                  />
                }
                title={'Development'}
                key={'0-0-0'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#f4d887'}}
                  />
                }
                title={'Media'}
                key={'0-0-1'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#8589fb'}}
                  />
                }
                title={'Office & Business'}
                key={'0-0-2'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#df87bb'}}
                  />
                }
                title={'File Management'}
                key={'0-0-3'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: 'green'}}
                  />
                }
                title={'Reading & Writing'}
                key={'0-0-0'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: 'black'}}
                  />
                }
                title={'Graphics'}
                key={'0-0-5'}
              />
            </Node>
            <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#d4d4d4'}}
                  />
                }
                title={'(No Project)'}
                key={'0-1'}
            />
          </Tree>
        </TreeContainer>
      </ContentsContainer>
    </Container>
  )
}
export default Projects
