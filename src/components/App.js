import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import '../App.css'
import Form from 'components/Form';
import Report from 'components/Report'
import Navbar from 'components/Navbar';

class App extends Component {

  state = {
    colours: [
      "BLACK",
      "BLUE",
      "RED",
      "GREEN"
    ], 
    disabled: true
  }

  componentDidMount(){
    this.setStorage();
  }

  setStorage = () => {
    this.state.colours.forEach(( colour ) => {
      localStorage.setItem(colour, 0)
    })
  }

  enableReport = () => {
    this.setState({
      disabled: false
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar disabled={this.state.disabled} />
          <Switch>
            <Route path={"/form"} exact render={ (routeProps) => <Form {...routeProps} colours={this.state.colours} enableReport={this.enableReport}/> }/>
            <Route path={"/report"} exact render={ (routeProps) => <Report {...routeProps} colours={this.state.colours}/> }/>    
            <Route path= {"/"} exact render={() => {return <Redirect to="/form"/> }} />
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;
