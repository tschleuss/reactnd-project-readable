import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './containers/App'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const history = createHistory()
const routerMid = routerMiddleware(history)

const store = createStore(combineReducers({ ...reducers, router: routerReducer }), composeWithDevTools(
    applyMiddleware(thunk, routerMid, logger),
))

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
