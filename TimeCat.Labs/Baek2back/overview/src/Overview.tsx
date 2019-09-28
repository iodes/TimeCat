import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

import TotalTime from "./components/Activity/TotalTime";

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
                Most active weekdays
              </Col>
              <Col xs={8} style={styles.colStyle}>
                Most active hours
              </Col>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Col xs={8} style={styles.colStyle}>
                Productivity scroe
              </Col>
              <Col xs={8} style={styles.colStyle}>
                Most producttive weekdays
              </Col>
              <Col xs={8} style={styles.colStyle}>
                Most productive hours
              </Col>
            </Col>
          </Row>
        </Col>
        <Col lg={12} style={styles.colStyle}>
          Time per Project per Hour
        </Col>
      </Row>
      <Row>
        <Col lg={12} style={styles.colStyle}>
          Applications
        </Col>
        <Col lg={12} style={styles.colStyle}>
          Projects & Tasks
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
