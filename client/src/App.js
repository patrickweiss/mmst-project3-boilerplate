import React from "react";
import "./App.css";
import IQttyTest from "./components/iq_test.js";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import IqNavbar from "./components/iq_Navbar";
import IqStartpage from "./components/iq_Startpage";
import IqSignup from "./components/iq_Signup";
import IqLogin from "./components/iq_Login";
import IqTraining from "./components/iq_Training";
import IqResultlist from "./components/iq_Resultlist";
//import Iqresult from "./components/iq_result";
import TestReview from "./components/iq_test-review"

export default class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  trainingRoute = props => {
    if (this.state.user) {
      return <IqTraining {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  resultListRoute = props => {
    if (this.state.user) {
      return <IqResultlist {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  testNewRoute = props => {
    if (this.state.user) {
      return (
        <IQttyTest {...props} userName={this.state.user.username}/>
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  testAgainRoute = props => {
    if (this.state.user) {
      return (
        <IQttyTest {...props} userName={this.state.user.username}/>
      );
    } else {
      return <Redirect to="/" />;
    }
  };

  render() {

    return (
      <div className="App">
        <IqNavbar user={this.state.user} setUser={this.setUser} />
        <Switch>

          <Route 
            exact 
            path="/test/id/:testId" 
            render= {this.testAgainRoute}
          />
          <Route 
            exact 
            path="/test/new/:complexity/:timeout" 
            render= {this.testNewRoute}
          />          
          <Route exact path="/review/id/:resultId" render= {
            props => <TestReview {...props} /> } 
          />
          <Route 
            exact 
            path="/" 
            component={IqStartpage} 
          />
          <Route
            exact
            path="/signup"
            render={props => <IqSignup {...props} setUser={this.setUser} />}
          />
          <Route
            exact 
            path="/login" 
            render={props => <IqLogin {...props} setUser={this.setUser} />}
          />
          <Route 
            exact 
            path="/training" 
            render={this.trainingRoute}
          />
          <Route 
            exact 
            path="/resultlist" 
            render={this.resultListRoute} 
          />
        </Switch>
      </div>
    );
  }
}
