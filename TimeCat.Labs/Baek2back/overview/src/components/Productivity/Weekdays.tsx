import React from "react";
import { Card, Typography } from "antd";
import { ResponsiveBar } from "@nivo/bar";
const { Text } = Typography;

const data = [
  {
    idx: 1,
    day: "월",
    data: -17,
    color: "#46e24e"
  },
  {
    idx: 2,
    day: "화",
    data: 8,
    color: "#ea4942"
  },
  {
    idx: 3,
    day: "수",
    data: 22
  },
  {
    idx: 4,
    day: "목",
    data: 30
  },
  {
    idx: 6,
    day: "금",
    data: -47
  },
  {
    idx: 7,
    day: "토",
    data: 44
  },
  {
    idx: 8,
    day: "일",
    data: 30
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
          keys={["data"]}
          indexBy={"day"}
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
