import * as React from 'react';
// import Timeline from '../components/Timeline';
import TimelineCalendar from '../components/TimelineCalendar';
export class ReportsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <TimelineCalendar />
        <h1>Hello, Reports Page</h1>
      </>
    );
  }
}

export default ReportsPage;
