import * as React from 'react';

export interface Props {}
export interface State {}

export class DetailsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <h1>Hello, Details Page</h1>
        );
    }
}

export default DetailsPage;
