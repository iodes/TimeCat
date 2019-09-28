import React from "react";
import { Card, Typography } from "antd";
import { ResponsiveBar } from "@nivo/bar";
const { Text } = Typography;
const data = [
  {
    label: "12AM",
    "-2": 20,
    "-1": 30,
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0
  },
  {
    label: "6AM",
    "-2": 0,
    "-1": 0,
    "0": 0,
    "1": 0,
    "2": -11,
    "3": -30
  },
  {
    label: "12PM",
    "-2": -19,
    "-1": 30,
    "0": 30,
    "1": 28,
    "2": 47,
    "3": 21
  },
  {
    label: "6PM",
    "-2": 1,
    "-1": 12,
    "0": 15,
    "1": 10,
    "2": 30,
    "3": 20
  }
];

const ProductiveHours: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Text strong>Most productive hours</Text>
      <div style={styles.barContainer}>
        <ResponsiveBar
          data={data}
          keys={["-2", "-1", "0", "1", "2", "3"]}
          indexBy="label"
          margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
          padding={0.1}
          groupMode="grouped"
          axisTop={null}
          colors={"#4bcd50"}
          innerPadding={2}
          axisRight={null}
          axisBottom={{ tickSize: 0 }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          enableGridY={false}
        />
      </div>
    </Card>
  );
};

const styles = {
  cardStyle: {
    width: 260,
    height: 180
  },
  bodyStyle: {
    padding: 12
  },
  barContainer: {
    height: 160
  }
};

export default ProductiveHours;
