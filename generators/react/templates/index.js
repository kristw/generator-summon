/* eslint-disable */
// This file is a boilerplate to enable react-hot-loader
// (Use webpack hot-module-replacement with react)
// Do not modify unless you know what you are doing.

import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}

