import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme';

import Report from 'components/Report'

let wrapper;
const colours = [
    "BLACK",
    "BLUE",
    "RED",
    "GREEN"
]

beforeEach(() => {
    wrapper = mount(
        <MemoryRouter initialEntries={[ '/form']}>
            <Report colours={colours} />
        </MemoryRouter>
    );
})

it ("renders 1 div for each preset color colour", () => {
    expect(wrapper.containsAllMatchingElements([
        <div>BLACK</div>,
        <div>BLUE</div>,
        <div>RED</div>,
        <div>GREEN</div>
    ]))
})
