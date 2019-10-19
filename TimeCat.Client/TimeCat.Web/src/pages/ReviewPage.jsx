import * as React from "react";
import Timeline from "../components/Timeline";

export class ReviewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Timeline />
        <h1>Hello, Review Page</h1>
      </>
    );
  }
}

export default ReviewPage;
