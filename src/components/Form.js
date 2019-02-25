import React, { Component } from 'react';
import validator from 'validator';
import { withRouter } from 'react-router-dom';

class Form extends Component {

    state = {
        email: "",
        phone: "",
        colour: "",

        emailErr: "",
        phoneErr: "",
        colourErr: "",

        emailValid: false,
        phoneValid: false,
        colourValid: false,
    }

    handleInputChange = (e) => {
        if (e.target.name !== undefined && e.target.value !== undefined) {
          this.setState({
            [e.target.name]: e.target.value
          })
        } 
    }

    handleSubmit = (e) => {
        e.preventDefault();
    
        let { emailValid, phoneValid, colourValid } = this.state;

        if (emailValid && phoneValid && colourValid) {
            this.clearForm();
            this.props.enableReport();
            this.props.history.push('/report')
        } else {
            this.validateInput("email", this.state.email)
            this.validateInput("phone", this.state.phone)
            this.validateInput("colour", this.state.colour)
        }

    }

    validateInput = ( field, value ) => {
        let fieldErr = field + "Err"
        let phoneNum = /\+1 \d\d\d \d\d\d \d\d \d\d/
        let { colours } = this.props;

        if ( value === "") {
            this.setState({
                [fieldErr]: "This is a required field."
            })
        }
    
        switch(field) {
            default: 
                break;
            case "email":
                if (validator.isEmail(value)) {
                    this.setState({
                        [fieldErr]: "",
                        emailValid: true
                    })
                } else {
                    this.setState({
                        [fieldErr]: "Invalid email address."
                    })
                }
                break;
            case "phone":
                if (phoneNum.test(value)) {
                    this.setState({
                        [fieldErr]: "",
                        phoneValid: true
                    })
                } else {
                    this.setState({
                        [fieldErr]: "Invalid phone number. Expecting +1 XXX XXX XX XX"
                    })
                }
                break;
            case "colour":
                if (colours.find(( colour ) => colour === value)) {
                    this.setState({
                        [fieldErr]: "",
                        colourValid: true
                    })
                    localStorage[value] = Number(localStorage[value]) + 1;
                } else {
                    this.setState({
                        [fieldErr]: "Colors must contain only uppercase alphabets."
                    })
                }
                break;
        }
    }

    clearForm = () => {
        this.setState({
            email: "",
            phone: "",
            colour: "",
            emailValid: false,
            phoneValid: false,
            colourValid: false
        })
    }

    render() {

        let { email, phone, colour, emailErr, phoneErr, colourErr } = this.state;

        return (
            <div className="form">
                <form className="form-color" id="form-color" onSubmit={this.handleSubmit}>
                    <label> 
                        <div>Email: </div>
                        <input id="form-email" name="email" type="text" value={email} onChange={this.handleInputChange} />
                    </label>
                    <div className="error-msg">{emailErr}</div>
                    <label> 
                        <div>Phone number: </div>
                        <input id="form-phone" name="phone" type="text" value={phone} onChange={this.handleInputChange} />
                    </label>
                    <div className="error-msg">{phoneErr}</div>
                    <label> 
                        <div> Favourite Colour:</div>
                        <input id="form-colour" name="colour" type="text" value={colour} onChange={this.handleInputChange}/>
                    </label>
                    <div className="error-msg">{colourErr}</div>
                    <button type="submit" value="Submit" >Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Form);