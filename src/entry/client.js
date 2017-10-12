/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import FontFaceObserver from 'fontfaceobserver';
import AppContainer from 'react-hot-loader/lib/AppContainer';

// internal
import '../styles/main.scss';
import configureStore from '../state/store';
import App from '../components/App';

const history = createHistory();
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState, history);

const robotoObserver = new FontFaceObserver('Roboto', {});
const rubikObserver = new FontFaceObserver('Rubik', {});
// When Roboto and Rubik are loaded, fontLoaded is appended to the body
Promise.all([robotoObserver.load(), rubikObserver.load()]).then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  },
);

const renderApp = App => {
  const MOUNT_POINT = document.getElementById('app');
  // in React 16 ReactDOM.render becomes ReactDOM.hydrate
  // when used for SSR.
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    MOUNT_POINT,
  );
};

renderApp(App);

if (module.hot && __DEV__) {
  module.hot.accept('../components/App', () => {
    const App = require('../components/App').default;
    renderApp(App);
  });
}
