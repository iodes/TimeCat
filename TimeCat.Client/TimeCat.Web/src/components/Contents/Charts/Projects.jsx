import { ResponsivePieCanvas } from '@nivo/pie';
import { Card, Col, Icon, Row, Tree, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { ProjectsData } from './ProjectsData';
const { TreeNode } = Tree;
const { Text } = Typography;

const Container = styled(Card)`
  width: 900px;
  height: 400px;
  background-color: #101417;
  .ant-card-body{
    padding: 15px;
  }
`;

const Title = styled(Text)`
  color: #C6C7C8;
`;

const ContentsContainer = styled(Row)`
  width: 780px;
`;

const PieContainer = styled(Col)`
  height: 320px;
`;

const TreeContainer = styled(Col)`
  height: 320px;
  overflow-y: scroll;
`;

const Node = styled(TreeNode)`
  border-bottom: 1px solid #282A2C;
  padding: 2px;
`;

const NodeIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const ProjectContainer = styled('div')`
  display: inline-flex;
`

const Project = styled('div')`
  color: white;
  width: 200px;
`

const Time = styled('div')`
  color: #808080;
`

const Projects = () => {
  const [data, setData] = React.useState(ProjectsData);
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Title strong>Projects & Tasks</Title>
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
          <Tree showIcon style = {{color: '#808080'}}>
            <Node
              icon = {
                <NodeIcon
                  style={{backgroundColor: '#eebc85'}}
                />
              }
              title={<ProjectContainer><Project>Sample Project</Project><Time>3h 2m</Time></ProjectContainer>}
              key={'0-0'}
            >
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#faef89'}}
                  />
                }
                title={<ProjectContainer><Project>Development</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-0'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#f4d887'}}
                  />
                }
                title={<ProjectContainer><Project>Media</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-1'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#8589fb'}}
                  />
                }
                title={<ProjectContainer><Project>Office</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-2'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#df87bb'}}
                  />
                }
                title={<ProjectContainer><Project>File Management</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-3'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: 'green'}}
                  />
                }
                title={<ProjectContainer><Project>Reading</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-4'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: 'black'}}
                  />
                }
                title={<ProjectContainer><Project>Graphics</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-5'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#faef89'}}
                  />
                }
                title={<ProjectContainer><Project>Development</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-6'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#f4d887'}}
                  />
                }
                title={<ProjectContainer><Project>Media</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-7'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#8589fb'}}
                  />
                }
                title={<ProjectContainer><Project>Office</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-8'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#df87bb'}}
                  />
                }
                title={<ProjectContainer><Project>File Management</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-9'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: 'green'}}
                  />
                }
                title={<ProjectContainer><Project>Reading</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-10'}
              />
              <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: 'black'}}
                  />
                }
                title={<ProjectContainer><Project>Graphics</Project><Time>3h 2m</Time></ProjectContainer>}
                key={'0-0-11'}
              />
            </Node>
            <Node
                icon = {
                  <NodeIcon
                    style={{backgroundColor: '#d4d4d4'}}
                  />
                }
                title={<ProjectContainer><Project>(No Project)</Project><Time></Time></ProjectContainer>}
                key={'0-1'}
            />
          </Tree>
        </TreeContainer>
      </ContentsContainer>
    </Container>
  );
};
export default Projects;