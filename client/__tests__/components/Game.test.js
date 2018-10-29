import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import fetchAvatars from '../../src/actions/marvel';
import Game from '../../src/components/pages/Game';
import createStore from '../../src/store';

const store = createStore({});
const mockStore = configureStore();

let wrapped;

beforeEach(() => {
  const location = {
    pathname: '/game',
    query: ['Thanos', 'Captain America', 'Spider-man', 'Daredevil', 'Magneto', 'Odin', 'Storm', 'Iron Man'],
  };
  wrapped = mount(
    <BrowserRouter>
      <Game store={store} location={location} />
    </BrowserRouter>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('renders without crashing', () => {
  wrapped.render();
});

describe('header and footer', () => {
  it('contains a header with a title', () => {
    expect(wrapped.find('header').length).toEqual(1);
    expect(wrapped.find('header').text()).toEqual('MARVEL SUPERHEROES');
  });
  it('contains an empty footer', () => {
    expect(wrapped.find('footer').length).toEqual(1);
    expect(wrapped.find('footer').text()).toEqual('');
  });
});

describe('container with 16 cards', () => {
  beforeEach(async () => {
    mockStore().clearActions();
    const heroes = ['Thanos', 'Captain America', 'Spider-man', 'Daredevil', 'Magneto', 'Odin', 'Storm', 'Iron Man'];
    await fetchAvatars(mockStore().dispatch, heroes);
  });
  it('contains a container for the cards', () => {
    expect(wrapped.find('.cards').length).toEqual(1);
  });
  it('contains 16 cards', () => {
    expect(wrapped.find('.card').length).toEqual(16);
  });
  it('contains 16 images', () => {
    expect(wrapped.find('img').length).toEqual(16);
  });
});
