import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'

const state = createStore(reducer)

ReactDOM.render(
    <Provider state={state}>
        <App />
    </Provider>,
    document.getElementById('root'),
)
