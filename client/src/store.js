import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';

const combinedReducers = combineReducers(reducers);

const logger = store => next => (action) => {
  const oldState = store.getState();
  const res = next(action);
  const newState = store.getState();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.info('------ Action dispatched ------', action) // eslint-disable-next-line
    console.info('---------- Old state ----------', oldState) // eslint-disable-next-line
    console.info('---------- New state ----------', newState)
  }
  return res;
};

export default function (initialState) {
  return createStore(combinedReducers, initialState, applyMiddleware(logger));
}
