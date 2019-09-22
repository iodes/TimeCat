import * as React from 'react';

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return (
            <h1>Hello, TimeCat</h1>
        );
    }
}

export default App;