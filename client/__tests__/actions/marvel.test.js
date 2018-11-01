import configureStore from 'redux-mock-store';
import { fetchAvatars } from '../../src/actions/marvel';
import { GET_AVATARS, AVATARS_LOADING } from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('fetchCards', () => {
  beforeEach(async () => {
    store.clearActions();
    await fetchAvatars(store.dispatch, ['iron man']);
  });

  it('has the correct type and payload for loading', () => {
    expect(store.getActions()[0].type).toEqual(AVATARS_LOADING);
    expect(store.getActions()[0].payload).toEqual(null);
  });

  it('has the correct type and payload for fetching avatars', () => {
    const { avatars } = store.getActions()[1].payload;
    const heroName = avatars[0].hero;
    expect(store.getActions()[1].type).toEqual(GET_AVATARS);
    expect(heroName.toLowerCase()).toEqual('iron man');
  });
});
