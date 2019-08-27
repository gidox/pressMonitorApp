import React from "react";
import { Component } from 'react';
import { StatusBar } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import * as reducers from "./reducers";
import { Provider as PaperProvider } from 'react-native-paper';

import AppContainer from "./config/router";



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === 'RESET_USER') { // If the user have successfully signed out and ended his/her session
    state = undefined // Reset all state to remove cached data of the previous session
  }
  return reducer(state, action)
}

const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Provider store={store}>
         <StatusBar backgroundColor="#E51B23" barStyle="light-content" />
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
