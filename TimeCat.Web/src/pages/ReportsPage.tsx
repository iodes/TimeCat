import * as React from 'react';

export interface Props {}
export interface State {}

export class ReportsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <h1>Hello, Reports Page</h1>
        );
    }
}

export default ReportsPage;
