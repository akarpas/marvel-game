import configureStore from 'redux-mock-store';
import fetchAvatars from '../../src/actions/marvel';
import { GET_AVATARS, AVATARS_LOADING } from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('fetchCards', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('has the correct type and payload for loading', async () => {
    await fetchAvatars(store.dispatch, ['iron man']);
    expect(store.getActions()[0].type).toEqual(AVATARS_LOADING);
    expect(store.getActions()[0].payload).toEqual(null);
  });
  it('has a successful response', async () => {
    await fetchAvatars(store.dispatch, ['iron man']);
    const { data } = store.getActions()[1].payload[0];
    const { code, status } = data;
    expect(code).toEqual(200);
    expect(status.toLowerCase()).toEqual('ok');
  });
  it('has the correct type and payload for fetching avatars', async () => {
    await fetchAvatars(store.dispatch, ['iron man']);
    const { data } = store.getActions()[1].payload[0].data;
    const { results } = data;
    const heroName = results[0].name;
    expect(store.getActions()[1].type).toEqual(GET_AVATARS);
    expect(heroName.toLowerCase()).toEqual('iron man');
  });
});
