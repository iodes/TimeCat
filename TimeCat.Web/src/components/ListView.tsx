import * as React from 'react';

export interface Props {}
export interface State {}

export class ListView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <h2>Hello, ListView Component</h2>
        );
    }
}

export default ListView;
