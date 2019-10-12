import React from 'react'

class Item extends React.Component {
    render() {
        return (
            <div>This item is { this.props.name } <span onClick={this.props.onRemoveClick}>delete</span></div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Hello, App',
            text: 'asd',
            items: [],
            id: 0,
        };

        this.addItem = this.addItem.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    addItem() {
        let { id, items, text } = this.state;
        this.setState({
            id: ++id,
            items: [
                ...items,
                <Item key={id} id={id} name={text} onRemoveClick={() => this.onItemRemove(id)} />
            ],
            text: '',
        });
    }

    onItemRemove(id) {
        this.setState({
            items: this.state.items.filter(item => item.props.id !== id),
        });
    }

    onTextChange(e) {
        this.setState({
            text: e.target.value,
        });
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.onTextChange} />
                <h1 onClick={this.addItem}>{ this.state.title }</h1>
                { this.state.items }
            </div>
        );
    }
}

export default App;