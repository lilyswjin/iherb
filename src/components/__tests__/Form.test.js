import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme';

import Form from 'components/Form'

let wrapper;
const colours = [
    "BLACK",
    "BLUE",
    "RED",
    "GREEN"
]
const onChangeMock = jest.fn();

describe("<Form /> component", () => {
    beforeEach(() => {
        wrapper = mount(
            <Router initialEntries={[ '/form']}>
                <Form colours={colours} onChange={onChangeMock} value="some value"/>
            </Router>
        );
    })
    
    afterEach(() => {
        wrapper.unmount();
    });
    
    it("renders three input fields and a button", () => {
        expect(wrapper.find('input').length).toEqual(3);
        expect(wrapper.find('button').length).toEqual(1);
    })
    
    it("when the form is submitted, the event is prevented", () => {
        let prevented = false;
    
        wrapper.find("form").simulate("submit", {
            preventDefault: () => {
                prevented = true;
            }
        });
        expect(prevented).toBe(true);
    })

    it('should call onChange prop with input value', () => {
        wrapper.find(Form).simulate("change", {
            target: { value: "text here" }
        });
    
        wrapper.update();
    
        expect(onChangeMock).toBeCalled();
    })
})

describe("input fields", () => {
    beforeEach(() => {
        wrapper = mount(
            <Router initialEntries={[ '/form']}>
                <Form colours={colours} onChange={onChangeMock} value="some value"/>
            </Router>
        );
    })
    
    afterEach(() => {
        wrapper.unmount();
    });

    it('should render a textbox that accepts user input', () => {
        wrapper.find("input#form-email").simulate("change", {
            target: {value: "email"}
        })
    
        expect(wrapper.find("input#form-email").prop('value')).toEqual("email");
    })
    
    it('should render an error message if an invalid email is entered', () => {
        wrapper.find("input#form-email").simulate("change", {
            target: {value: "email"}
        })

        expect(wrapper.find("div.error-msg").at(0).innerHTML).not.toEqual("");
    })
    
    it('clears the form and error messages when the form is submitted', () => {
        wrapper.find("form#form-color").simulate('submit', {
            target: {
            }
        })

        expect(wrapper.find('input#form-email').props().value).toEqual("");

    })
})    

