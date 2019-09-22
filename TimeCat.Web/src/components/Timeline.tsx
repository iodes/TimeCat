import * as React from 'react';

export interface Props {}
export interface State {}

export class Timeline extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <h2>Hello, Timeline Component</h2>
        );
    }
}

export default Timeline;
