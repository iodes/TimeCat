import React from "react";
import { Card, Typography, Row, Col, List, Avatar } from "antd";
import { ResponsivePieCanvas } from "@nivo/pie";
const { Text } = Typography;
const listData = [
  {
    name: "Chrome",
    src: "/icon/chrome.png",
    usage: "30h 20m"
  },
  {
    name: "Code",
    src: "/icon/code.png",
    usage: "17h 37m"
  },
  {
    name: "Facebook",
    src: "/icon/facebook.png",
    usage: "20m"
  },
  {
    name: "App Store",
    src: "/icon/store.png",
    usage: "3m"
  }
];
const data = [
  {
    id: "Chrome",
    label: "Chrome",
    value: 60,
    color: "hsl(299, 70%, 50%)"
  },
  {
    id: "Code",
    label: "Code",
    value: 25,
    color: "hsl(158, 70%, 50%)"
  },
  {
    id: "Facebook",
    label: "Facebook",
    value: 10,
    color: "hsl(353, 70%, 50%)"
  },
  {
    id: "Store",
    label: "Store",
    value: 5,
    color: "hsl(49, 70%, 50%)"
  }
];

const Applications: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Text strong>Applications</Text>
      <Row style={styles.contentContainer}>
        <Col span={12} style={styles.pieContainer}>
          <ResponsivePieCanvas
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            enableRadialLabels={false}
            pixelRatio={5}
            innerRadius={0.4}
            padAngle={0.3}
            cornerRadius={1}
            sliceLabel="id"
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </Col>
        <Col span={12} style={styles.listContainer}>
          <List
            size="small"
            dataSource={listData}
            style={styles.listStyle}
            renderItem={item => (
              <List.Item style={styles.itemContainer}>
                <Avatar src={item.src} style={styles.avatarStyle} />
                <List.Item.Meta title={item.name} style={styles.appName} />
                <List.Item.Meta description={item.usage} style={styles.usage} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
};

const styles = {
  cardStyle: {
    width: 820,
    height: 380
  },
  bodyStyle: {
    padding: 12
  },
  contentContainer: {
    width: 780
  },
  pieContainer: {
    height: 320
  },
  listContainer: {
    height: 320
  },
  listStyle: {
    margin: 10
  },
  itemContainer: {
    padding: 1
  },
  avatarStyle: {
    width: 20,
    height: 20,
    marginBottom: 5
  },
  appName: {
    marginLeft: 5
  },
  usage: {
    width: 20,
    height: 20,
    marginBottom: 5
  }
};

export default Applications;
