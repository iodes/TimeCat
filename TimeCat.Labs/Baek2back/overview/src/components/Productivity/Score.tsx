import React from "react";
import { Card, Typography } from "antd";
const { Text } = Typography;

const Score: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Text strong>Productivity Score</Text>
      <p style={styles.percentStyle}>58%</p>
      <p style={styles.commentStyle}>Keep it up 😊</p>
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
  percentStyle: {
    marginTop: 30,
    marginBottom: 5,
    fontWeight: "bold" as "bold",
    fontSize: 36,
    textAlign: "center" as "center",
    color: "#4bcd50"
  },
  commentStyle: {
    fontSize: 14,
    textAlign: "center" as "center",
    lineHeight: "10%"
  }
};

export default Score;
