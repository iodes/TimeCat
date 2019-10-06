import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

import TotalTime from "./components/Activity/TotalTime";
import ActiveWeekdays from "./components/Activity/Weekdays";
import ActiveHours from "./components/Activity/Hours";

import Score from "./components/Productivity/Score";
import ProductiveWeekdays from "./components/Productivity/Weekdays";
import ProductiveHours from "./components/Productivity/Hours";

import StackedBar from "./components/Charts/StackedBar";
import Applications from "./components/Charts/Applications";
import Projects from "./components/Charts/Projects";

const Overview: React.FC = () => {
  return (
    <div style={styles.container}>
      <Row>
        <Col lg={12}>
          <Row>
            <Col xs={24}>
              <Col xs={8} style={styles.colStyle}>
                <TotalTime />
              </Col>
              <Col xs={8} style={styles.colStyle}>
                <ActiveWeekdays />
              </Col>
              <Col xs={8} style={styles.colStyle}>
                <ActiveHours />
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Col xs={8} style={styles.colStyle}>
                <Score />
              </Col>
              <Col xs={8} style={styles.colStyle}>
                <ProductiveWeekdays />
              </Col>
              <Col xs={8} style={styles.colStyle}>
                <ProductiveHours />
              </Col>
            </Col>
          </Row>
        </Col>
        <Col lg={12} style={styles.colStyle}>
          <StackedBar />
        </Col>
      </Row>
      <Row>
        <Col lg={12} style={styles.colStyle}>
          <Applications />
        </Col>
        <Col lg={12} style={styles.colStyle}>
          <Projects />
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#eeeeee"
  },
  colStyle: {
    padding: 10,
    display: "flex",
    justifyContent: "center"
  }
};

export default Overview;
