import * as React from 'react';
// import Timeline from '../components/Timeline';
import Timeline from '../components/Timeline';
export class ReportsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Timeline />
        <h1>Hello, Reports Page</h1>
      </>
    );
  }
}

export default ReportsPage;
