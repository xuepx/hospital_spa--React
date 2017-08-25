import './css/common.css'
import React from 'react'
import { render } from 'react-dom'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import todoApp from './store/reducers'
import RouteElements from './route/router.jsx'
import { $ }from './js/common'

$.store = ((preloadedState) => {
    return createStore(
        todoApp,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    )
})() 

render(
    <RouteElements store={$.store} />,
    document.body
)