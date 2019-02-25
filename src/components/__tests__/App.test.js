import React from 'react';
import { shallow } from 'enzyme';

import App from 'components/App';
import Navbar from 'components/Navbar';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});


it('renders a Navbar element', () => {
  expect(wrapper.find(Navbar).length).toEqual(1);
});


