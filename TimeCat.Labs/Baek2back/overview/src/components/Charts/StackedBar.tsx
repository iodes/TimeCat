import React from "react";
import { Card, Typography, Select } from "antd";
import { ResponsiveBar } from "@nivo/bar";

const { Option } = Select;
const { Text } = Typography;
const data = [
  {
    country: "01/09~07/09",
    "hot dog": 148,
    "hot dogColor": "hsl(41, 70%, 50%)",
    burger: 139,
    burgerColor: "hsl(229, 70%, 50%)",
    sandwich: 45,
    sandwichColor: "hsl(64, 70%, 50%)",
    kebab: 191,
    kebabColor: "hsl(188, 70%, 50%)",
    fries: 193,
    friesColor: "hsl(231, 70%, 50%)",
    donut: 135,
    donutColor: "hsl(175, 70%, 50%)"
  },
  {
    country: "08/09~14/09",
    "hot dog": 96,
    "hot dogColor": "hsl(83, 70%, 50%)",
    burger: 27,
    burgerColor: "hsl(336, 70%, 50%)",
    sandwich: 14,
    sandwichColor: "hsl(73, 70%, 50%)",
    kebab: 200,
    kebabColor: "hsl(269, 70%, 50%)",
    fries: 48,
    friesColor: "hsl(353, 70%, 50%)",
    donut: 54,
    donutColor: "hsl(98, 70%, 50%)"
  },
  {
    country: "15/09~21/09",
    "hot dog": 198,
    "hot dogColor": "hsl(354, 70%, 50%)",
    burger: 101,
    burgerColor: "hsl(106, 70%, 50%)",
    sandwich: 4,
    sandwichColor: "hsl(86, 70%, 50%)",
    kebab: 10,
    kebabColor: "hsl(231, 70%, 50%)",
    fries: 88,
    friesColor: "hsl(126, 70%, 50%)",
    donut: 166,
    donutColor: "hsl(9, 70%, 50%)"
  },
  {
    country: "22/09~28/09",
    "hot dog": 174,
    "hot dogColor": "hsl(345, 70%, 50%)",
    burger: 134,
    burgerColor: "hsl(285, 70%, 50%)",
    sandwich: 46,
    sandwichColor: "hsl(232, 70%, 50%)",
    kebab: 140,
    kebabColor: "hsl(245, 70%, 50%)",
    fries: 41,
    friesColor: "hsl(89, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(50, 70%, 50%)"
  },
  {
    country: "29/09~30/09",
    "hot dog": 143,
    "hot dogColor": "hsl(170, 70%, 50%)",
    burger: 46,
    burgerColor: "hsl(227, 70%, 50%)",
    sandwich: 31,
    sandwichColor: "hsl(74, 70%, 50%)",
    kebab: 84,
    kebabColor: "hsl(149, 70%, 50%)",
    fries: 60,
    friesColor: "hsl(103, 70%, 50%)",
    donut: 107,
    donutColor: "hsl(13, 70%, 50%)"
  }
];

const StackedBar: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <div>
        <Select
          size="small"
          defaultValue="Time per Project"
          style={styles.longerSelect}
        >
          <Option value="Time per Project">Time per Project</Option>
          <Option value="Productivity Score">Productivity Score</Option>
        </Select>
        <Text strong style={styles.textStyle}>
          per
        </Text>
        <Select size="small" defaultValue="Day" style={styles.shorterSelect}>
          <Option value="Hour">Hour</Option>
          <Option value="Day">Day</Option>
          <Option value="Week">Week</Option>
          <Option value="Month">Month</Option>
          <Option value="Year">Year</Option>
        </Select>
      </div>
      <div style={styles.barContainer}>
        <ResponsiveBar
          data={data}
          keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
          margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          enableGridX={false}
          enableGridY={false}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{ tickSize: 0 }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
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
  barContainer: {
    height: 340
  },
  longerSelect: {
    width: 150
  },
  textStyle: {
    marginLeft: 5,
    marginRight: 5
  },
  shorterSelect: {
    width: 80
  }
};

export default StackedBar;
