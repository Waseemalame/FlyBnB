import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ModalProvider } from './context/Modal';
import MultiContextProvider from './context/MultiContext';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';

import * as sessionActions from './store/session';

import './index.css';
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.csrfFetch = csrfFetch;
  window.store = store;
}

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <MultiContextProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </MultiContextProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
