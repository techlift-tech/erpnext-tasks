'use strict'

import * as React from 'react'
import Router from './Router'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from '@stores'
import { createStore, compose, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

let store: any = null
const middleware = [thunk]
store = compose(applyMiddleware(...middleware))(createStore)(reducers)
let persistor = persistStore(store)

interface Props { }

interface States { }

export default class App extends React.Component<Props, States> {
  render() {
    return (
      <Provider loading={null} store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}