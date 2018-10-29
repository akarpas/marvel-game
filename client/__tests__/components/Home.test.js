import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/components/pages/Home';
import Heroes from '../../data/heroes';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('renders without crashing', () => {
  wrapped.render();
});

describe('header, text and footer', () => {
  it('contains a header with a title', () => {
    expect(wrapped.find('header').length).toEqual(1);
    expect(wrapped.find('header').text()).toEqual('MARVEL SUPERHEROES');
  });
  it('contains an empty footer', () => {
    expect(wrapped.find('footer').length).toEqual(1);
    expect(wrapped.find('footer').text()).toEqual('');
  });
  it('contains a description and an instruction title', () => {
    expect(wrapped.find('.description').length).toEqual(1);
    expect(wrapped.find('.title').length).toEqual(1);
    expect(wrapped.find('.description').text()).toContain('A fun memory game with your favorite Marvel superheroes!');
    expect(wrapped.find('.title').text()).toContain('Pick your 8 Heroes:');
  });
});

describe('main content with options', () => {
  it('contains a section with the superheroes to select', () => {
    expect(wrapped.find('.options').length).toEqual(1);
  });
  it('contains 20 buttons', () => {
    const options = wrapped.find('.options');
    expect(options.find('button').length).toEqual(20);
  });
  it('changes button class on click', () => {
    const oneButton = wrapped.find('button').first();
    expect(oneButton.hasClass('button')).toEqual(true);
    oneButton.simulate('click');
    wrapped.update();
    expect(wrapped.find('button').first().hasClass('buttonSelected')).toEqual(true);
  });
  it('adds correct hero to the state when clicked', () => {
    const wrapperHome = wrapped.find(Home).children().children();
    const firstHero = Heroes[0];
    expect(wrapperHome.state().heroesSelected.length).toEqual(0);
    const oneButton = wrapperHome.find('button').first();
    const hero = oneButton.text();
    oneButton.simulate('click', { preventDefault() {} });
    wrapperHome.update();
    expect(wrapperHome.state().heroesSelected.length).toEqual(1);
    expect(wrapperHome.state().heroesSelected[0]).toEqual(hero);
    expect(wrapperHome.state().heroesSelected[0]).toEqual(firstHero);
  });
});

describe('action buttons - Shuffle and Play', () => {
  it('contains a Shuffle button', () => {
    expect(wrapped.find('#shuffle').text()).toContain('Shuffle');
  });
  it('contains a Play button which is disabled', () => {
    expect(wrapped.find('#play').text()).toContain('Play');
    expect(wrapped.find('#play').prop('disabled')).toEqual(true);
  });
});
