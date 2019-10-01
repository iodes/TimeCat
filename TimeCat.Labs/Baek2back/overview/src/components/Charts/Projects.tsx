import React from "react";
import { Card, Typography, Row, Col, Tree, Icon } from "antd";
import { ResponsivePieCanvas } from "@nivo/pie";

const { TreeNode } = Tree;
const { Text } = Typography;

const data = [
  {
    id: "make",
    label: "make",
    value: 339,
    color: "hsl(299, 70%, 50%)"
  },
  {
    id: "python",
    label: "python",
    value: 519,
    color: "hsl(158, 70%, 50%)"
  },
  {
    id: "c",
    label: "c",
    value: 328,
    color: "hsl(353, 70%, 50%)"
  },
  {
    id: "hack",
    label: "hack",
    value: 595,
    color: "hsl(49, 70%, 50%)"
  },
  {
    id: "php",
    label: "php",
    value: 277,
    color: "hsl(157, 70%, 50%)"
  },
  {
    id: "haskell",
    label: "haskell",
    value: 539,
    color: "hsl(33, 70%, 50%)"
  },
  {
    id: "go",
    label: "go",
    value: 315,
    color: "hsl(297, 70%, 50%)"
  },
  {
    id: "ruby",
    label: "ruby",
    value: 325,
    color: "hsl(102, 70%, 50%)"
  },
  {
    id: "java",
    label: "java",
    value: 163,
    color: "hsl(272, 70%, 50%)"
  },
  {
    id: "javascript",
    label: "javascript",
    value: 237,
    color: "hsl(314, 70%, 50%)"
  },
  {
    id: "scala",
    label: "scala",
    value: 46,
    color: "hsl(334, 70%, 50%)"
  },
  {
    id: "elixir",
    label: "elixir",
    value: 9,
    color: "hsl(111, 70%, 50%)"
  },
  {
    id: "erlang",
    label: "erlang",
    value: 475,
    color: "hsl(122, 70%, 50%)"
  },
  {
    id: "css",
    label: "css",
    value: 228,
    color: "hsl(284, 70%, 50%)"
  },
  {
    id: "sass",
    label: "sass",
    value: 442,
    color: "hsl(165, 70%, 50%)"
  },
  {
    id: "stylus",
    label: "stylus",
    value: 403,
    color: "hsl(284, 70%, 50%)"
  },
  {
    id: "rust",
    label: "rust",
    value: 25,
    color: "hsl(258, 70%, 50%)"
  },
  {
    id: "lisp",
    label: "lisp",
    value: 65,
    color: "hsl(302, 70%, 50%)"
  }
];

const Projects: React.FC = () => {
  return (
    <Card
      hoverable
      bordered={true}
      style={styles.cardStyle}
      bodyStyle={styles.bodyStyle}
    >
      <Text strong>Projects & Tasks</Text>
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
            colors={{ scheme: "paired" }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </Col>
        <Col span={12} style={styles.treeContainer}>
          <Tree showIcon>
            <TreeNode
              icon={
                <Icon
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#eebc85"
                  }}
                />
              }
              style={styles.nodeStyle}
              title="Sample Projects"
              key="0-0"
            >
              <TreeNode
                icon={
                  <Icon
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#faef89"
                    }}
                  />
                }
                style={styles.nodeStyle}
                title="Development"
                key="0-0-0"
              />
              <TreeNode
                icon={
                  <Icon
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#f4d887"
                    }}
                  />
                }
                style={styles.nodeStyle}
                title="Media"
                key="0-0-1"
              />
              <TreeNode
                icon={
                  <Icon
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#8589fb"
                    }}
                  />
                }
                style={styles.nodeStyle}
                title="Office & Business"
                key="0-0-2"
              />
              <TreeNode
                icon={
                  <Icon
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#df87bb"
                    }}
                  />
                }
                style={styles.nodeStyle}
                title="File Management"
                key="0-0-3"
              />
              <TreeNode
                icon={
                  <Icon
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "green"
                    }}
                  />
                }
                style={styles.nodeStyle}
                title="Reading & Writing"
                key="0-0-4"
              />
              <TreeNode
                icon={
                  <Icon
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "black"
                    }}
                  />
                }
                style={styles.lastNode}
                title="Graphics"
                key="0-0-5"
              />
            </TreeNode>
            <TreeNode
              icon={
                <Icon
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#d4d4d4"
                  }}
                />
              }
              style={styles.nodeStyle}
              title="(No Project)"
              key="0-1"
            />
          </Tree>
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
  treeContainer: {
    height: 320
  },
  nodeStyle: {
    borderBottom: "1px solid #e7e7e7",
    padding: 2
  },
  lastNode: {
    padding: 2
  }
};

export default Projects;
