import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import App from './components/App';

import style from './index.scss';

const Application = () => {
  ReactDOM.render(
    <div className={style.appContainer}>
      <Provider>
        <App />
      </Provider>
    </div>,
  );
};

Application();

export default hot(module)(Application);
