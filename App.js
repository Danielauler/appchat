import React from 'react';
import Routes from './src/Routes/Routes';
import reducers from './src/reducers'
import firebase from 'firebase';
import ReduxThunk from  'redux-thunk';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

export default class App extends React.Component {

  componentWillMount() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDkok5g5aohLV8c9-Il4upDLA976tKuvEM",
      authDomain: "zipzepelin.firebaseapp.com",
      databaseURL: "https://zipzepelin.firebaseio.com",
      projectId: "zipzepelin",
      storageBucket: "zipzepelin.appspot.com",
      messagingSenderId: "70634397166"
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes/>
      </Provider>
    );
  }
}
