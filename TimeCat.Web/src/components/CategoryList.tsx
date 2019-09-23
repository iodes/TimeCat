import * as React from 'react';

export interface Props {}
export interface State {}

export class CategoryList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <h2>Hello, CategoryList Component</h2>
        );
    }
}

export default CategoryList;
