import React from "react";
import { Card, Typography } from "antd";
const { Text } = Typography;

const TotalTime: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Text strong>Total Time</Text>
      <p style={styles.pStyle}>3h 42m</p>
      <p style={styles.summaryStyle}>
        <b style={styles.bStyle}>28m</b> hour
      </p>
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
  pStyle: {
    marginTop: 30,
    marginBottom: 5,
    fontWeight: "bold" as "bold",
    fontSize: 36,
    textAlign: "center" as "center",
    color: "#006fff"
  },
  summaryStyle: {
    fontSize: 14,
    lineHeight: "10%",
    textAlign: "center" as "center"
  },
  bStyle: {
    color: "#006fff"
  }
};

export default TotalTime;
