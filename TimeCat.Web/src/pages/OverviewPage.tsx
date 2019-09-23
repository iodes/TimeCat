import * as React from 'react';

export interface Props {}
export interface State {}

export class OverviewPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <h1>Hello, Overview Page</h1>
        );
    }
}

export default OverviewPage;
