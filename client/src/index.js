import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Game from './components/pages/Game';
import createStore from './store';

import style from './index.scss';

const store = createStore({});

const Application = () => {
  ReactDOM.render(
    <div className={style.appContainer}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/game" component={Game} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>,
    document.getElementById('app'),
  );
};

Application();

export default hot(module)(Application);
