import React from 'react';
import css from './App.scss';
// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import { createLogger } from 'redux-logger';
// import thunk from 'redux-thunk';
// import reducer from './modules/myModule/reducer';
// import Component from './modules/myModule/containers/index';
// import * as Actions from './modules/myModule/actions/location';

// const logger = createLogger({ collapsed: true });
// const store = createStore(
//   reducer,
//   applyMiddleware(thunk, logger),
// );

// // Load initial state from URL
// store.dispatch(Actions.updateStateFromUrl());

const App = () => (
  <div className={css.app}>
    {/*<Provider store={store}>*/}
      {/*<Component />*/}
    {/*</Provider>*/}
  </div>
);

export default App;

