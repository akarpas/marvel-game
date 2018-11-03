import configureStore from 'redux-mock-store';
import marvelReducer from '../../src/reducers/marvel';
import { fetchAvatars } from '../../src/actions/marvel';

import { GET_AVATARS, AVATARS_LOADING } from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('get avatars from marvel api', () => {
  beforeEach(async () => {
    store.clearActions();
    await fetchAvatars(store.dispatch, ['iron man']);
  });

  it('handles actions of type AVATARS_LOADING', async () => {
    const { payload } = store.getActions()[0];
    const action = {
      type: AVATARS_LOADING,
      payload,
    };
    const newState = await marvelReducer({ avatars: [] }, action);
    expect(newState).toEqual({
      avatars: [],
      avatarsLoading: true,
      error: null,
    });
  });

  it('handles actions of type GET_AVATARS', async () => {
    const heroes = ['iron man'];
    const { payload } = store.getActions()[1];
    const action = {
      type: GET_AVATARS,
      payload,
    };
    const newState = await marvelReducer({ avatars: [] }, action);
    const result = {
      image: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg',
      hero: heroes[0],
    };
    const results = [];
    results.push(result);
    results.push(result);
    expect(newState).toEqual({
      avatars: results,
      avatarsLoading: false,
      error: null,
    });
  });
});
