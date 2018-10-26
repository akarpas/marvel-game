import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import App from './components/App';
import createStore from './store';

import style from './index.scss';

const store = createStore({});

const Application = () => {
  ReactDOM.render(
    <div className={style.appContainer}>
      <Provider store={store}>
        <App />
      </Provider>
    </div>,
    document.getElementById('app'),
  );
};

Application();

export default hot(module)(Application);
