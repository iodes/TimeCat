import { ResponsiveBar } from '@nivo/bar';
import { Card, Typography } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { HoursData } from './HoursData';
const { Text } = Typography;

const Container = styled(Card)`
  width: 280px;
  height: 200px;
  background-color: #101417;
  .ant-card-body{
    padding: 15px;
  }
`;

const Title = styled(Text)`
  color: #C6C7C8;
`;

const BarContainer = styled('div')`
  height: 160px;
`;

const theme = {
  axis: {
    ticks: {
      text: {
        'fill' : '#ffff'
      }
    }
  }
};

const ProductiveHours = () => {
  const [data, setData] = React.useState(HoursData);
  return (
    <Container
      hoverable
      bordered={false}
    >
      <Title strong>Most productive hours</Title>
      <BarContainer>
        <ResponsiveBar
          data={data}
          keys={['-2','-1','0','1','2','3']}
          indexBy={'label'}
          margin={{top: 10, right: 0, bottom: 50, left: 0}}
          padding={0.1}
          innerPadding={2}
          groupMode={'grouped'}
          axisTop={null}
          axisRight={null}
          axisBottom={{tickSize: 0}}
          colors={(d) => {
            return d.value >= 0 ? '#8fe563' : '#d06b55';
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          enableGridY={false}
          theme={theme}
        />
      </BarContainer>
    </Container>
  );
};

export default ProductiveHours;