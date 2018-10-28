import configureStore from 'redux-mock-store';
import marvelReducer from '../../src/reducers/marvel';
import fetchAvatars from '../../src/actions/marvel';

import { GET_AVATARS, AVATARS_LOADING } from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('get avatars from marvel api', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('handles actions of type AVATARS_LOADING', async () => {
    await fetchAvatars(store.dispatch, ['iron man']);
    const { payload } = store.getActions()[0];
    const action = {
      type: AVATARS_LOADING,
      payload,
    };
    const newState = await marvelReducer({ avatars: [] }, action);
    expect(newState).toEqual({
      avatars: [],
      avatarsLoading: true,
    });
  });

  it('handles actions of type GET_AVATARS', async () => {
    await fetchAvatars(store.dispatch, ['iron man']);
    const { payload } = store.getActions()[1];
    const action = {
      type: GET_AVATARS,
      payload,
    };
    const newState = await marvelReducer({ avatars: [] }, action);
    expect(newState).toEqual({
      avatars: ['http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg'],
      avatarsLoading: false,
    });
  });
});
