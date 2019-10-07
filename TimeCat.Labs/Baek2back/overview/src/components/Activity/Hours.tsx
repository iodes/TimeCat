import React from "react";
import { Card, Typography } from "antd";
import { ResponsiveBar } from "@nivo/bar";
const { Text } = Typography;
const data = [
  {
    label: "12AM",
    "-2": 132,
    "-1": 2,
    "0": 53,
    "1": 173,
    "2": 96,
    "3": 85
  },
  {
    label: "6AM",
    "-2": 68,
    "-1": 187,
    "0": 81,
    "1": 35,
    "2": 166,
    "3": 69
  },
  {
    label: "12PM",
    "-2": 151,
    "-1": 172,
    "0": 188,
    "1": 28,
    "2": 47,
    "3": 81
  },
  {
    label: "6PM",
    "-2": 114,
    "-1": 178,
    "0": 75,
    "1": 125,
    "2": 153,
    "3": 159
  }
];

const ActiveHours: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Text strong>Most active hours</Text>
      <div style={styles.barContainer}>
        <ResponsiveBar
          data={data}
          keys={["-2", "-1", "0", "1", "2", "3"]}
          indexBy="label"
          margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
          padding={0.1}
          groupMode="grouped"
          axisTop={null}
          colors={"#006fff"}
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

export default ActiveHours;
