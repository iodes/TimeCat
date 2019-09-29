import React from "react";
import { Card, Typography } from "antd";
import { ResponsiveBar } from "@nivo/bar";
const { Text } = Typography;

const data = [
  {
    day: "월",
    value: -17
  },
  {
    day: "화",
    value: 8
  },
  {
    day: "수",
    value: 22
  },
  {
    day: "목",
    value: 30
  },
  {
    day: "금",
    value: -47
  },
  {
    day: "토",
    value: 44
  },
  {
    day: "일",
    value: 30
  }
];

const ProductiveWeekdays: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Text strong>Most productive weekdays</Text>
      <div style={styles.barContainer}>
        <ResponsiveBar
          data={data}
          groupMode={"grouped"}
          keys={["value"]}
          indexBy={"day"}
          colors={d => {
            return d.data.value >= 0 ? "#8fe563" : "#d05b55";
          }}
          margin={{ top: 10, right: 0, bottom: 50, left: 0 }}
          padding={0.1}
          enableLabel={false}
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisLeft={null}
          axisBottom={{ tickSize: 0 }}
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

export default ProductiveWeekdays;
