import { ResponsivePieCanvas } from '@nivo/pie';
import { Avatar, Card, Col, List, Row, Typography, Button } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { ApplicationsData } from './ApplicationsData';
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

const ListContainer = styled(Col)`
  height: 320px;
  overflow-y: scroll;
`;

const Icon = styled(Avatar)`
  width: 15px;
  height: 15px;
`;

const Name = styled(List.Item.Meta)`
  margin-left:10px;
  margin-top: 5px;
  .ant-list-item-meta-title {
    color: #ffffff;
  }
`;

const Usage = styled(List.Item.Meta)`
  width: 20px;
  height: 20px;
  font-size: 5px;
  text-align: left;
  .ant-list-item-meta-description{
    color: #808080;
  }
`;

const secondsToString = (seconds) => {
  let total = seconds;
  let days = Math.floor(total/(24*60*60));
  total -= days * (24*60*60);
  let hours = Math.floor(total/(60*60));
  total -= hours * (60*60);
  let minutes = Math.floor(total/60);
  return (0 < days ? days + "day, ":"")+hours+"h "+minutes+"m"
}

const Applications = () => {
  const [data, setData] = React.useState(ApplicationsData);
  let dummy = [];
  const getDummy = () => { stream(
      "dashboard.GetApplications",
      {
        range: {
          start: 0,
          end: Date.now()
        }
      },
      data => {
        console.log("data",data);
        dummy.push({
          id: data.application.name,
          src: "../../../TimeCat.Client/TimeCat.Web/src/assets/images/chrome.png",
          value: data.totaltime.seconds,
          usage: secondsToString(data.totaltime.seconds)
        });
      },
      () => {
        console.log("end");
        setData(dummy);
        dummy = [];
      }
    );
  }
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Button type = "primary" shape="circle" icon="sync" onClick={getDummy}/>
      <Title strong>Applications</Title>
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
              <List.Item style ={{ borderBottom: '1px solid #282A2C', padding: 0}}>
                <Icon src={item.src}/>
                <Name title={item.id}/>
                <Usage description={item.usage}/>
              </List.Item>
            )}
          />
        </ListContainer>
      </ContentsContainer>
    </Container>
  );
};

export default Applications;