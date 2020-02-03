import React from "react";
import "./App.css";
import {Switch, Route, Redirect } from "react-router-dom";
import IqNavbar from "./components/iq_Navbar";
import IqStartpage from "./components/iq_Startpage";
/* import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";
import TaskDetail from "./components/TaskDetail"; */
import IqSignup from "./components/iq_Signup";
import IqLogin from "./components/iq_Login";
import IqTraining from "./components/iq_Training";



class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  /* projectsRoute = props => {
    if (this.state.user) {
      return <Projects {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  } */

  trainingRoute = props => {
    if (this.state.user) {
      return <IqTraining {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  render() {
    return (
      <div className="App">
        <IqNavbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route exact path="/" component={IqStartpage} />
          <Route exact path="/signup" render={
            props => <IqSignup {...props} setUser={this.setUser} />
          }/>
          <Route exact path="/login" render={
            props => <IqLogin {...props} setUser={this.setUser} />
          }/>
          <Route exact path="/training" render={this.trainingRoute}/>
{/* 
          <Route exact path="/projects" render={this.projectsRoute}/>
          <Route exact path="/projects/:id" render={
            props => <ProjectDetail user={this.state.user} {...props} />
          }/>
          <Route exact path="/tasks/:id" component={TaskDetail} />
           */}
        </Switch>
      </div>
    );
  }
}

export default App;
