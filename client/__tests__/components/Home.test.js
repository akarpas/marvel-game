import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/components/pages/Home';

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
