import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { fetchAvatars } from '../../src/actions/marvel';
import Game from '../../src/components/pages/Game';
import createStore from '../../src/store';

const mockStore = configureStore();

let wrapped;

const initialState = {
  marvel: {
    avatars: [],
    avatarsLoading: false,
  },
};

const store = createStore({});


beforeEach(() => {
  const heroes = ['Thanos', 'Captain America', 'Spider-man', 'Daredevil', 'Magneto', 'Odin', 'Storm', 'Iron Man'];

  wrapped = mount(
    <Provider store={store} initialState={initialState}>
      <BrowserRouter>
        <Game heroesSelected={heroes} />
      </BrowserRouter>
    </Provider>,
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

describe('container for cards', () => {
  beforeEach(async () => {
    mockStore().clearActions();
    const heroes = ['Thanos', 'Captain America', 'Spider-man', 'Daredevil', 'Magneto', 'Odin', 'Storm', 'Iron Man'];
    await fetchAvatars(mockStore().dispatch, heroes);
    wrapped.update();
  }, 10000);
  afterAll(() => { // eslint-disable-line
    wrapped.unmount();
  });
  it('contains a container for the cards', () => {
    expect(wrapped.update().find('.cards').length).toEqual(1);
  });
  it('contains 16 cards', () => {
    expect(wrapped.find('.card').length).toEqual(16);
  });
});
