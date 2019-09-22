import * as React from 'react';

export interface Props {}
export interface State {}

export class ReviewPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <h1>Hello, Review Page</h1>
        );
    }
}

export default ReviewPage;
