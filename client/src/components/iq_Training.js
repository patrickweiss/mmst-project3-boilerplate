import React, { Component } from "react";
import "../stylesheets/iq_training.css";
import { Link } from "react-router-dom";
//import IQttyTest from "./iq_test";
//import { Tooltip } from "react-bootstrap";
class IqTraining extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complexity: "Low",
      timeout: "no",
      //runTest: false
    };

    this.handleComplexity = this.handleComplexity.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this); 
    //this.startTestHandler = this.startTestHandler.bind(this);
  }

  handleComplexity(event) {
    this.setState({
      complexity: event.target.value
    });
  }

  handleTimeout(event) {
    this.setState({
      timeout: event.target.value
    });
  }

  /*
  startTestHandler(event) {
    console.log("Start Test Button clicked");
    console.log(this.state.complexity);
    console.log(this.state.timeout);
    this.setState({
      runTest: true
    });
  }*/

  render() {

      return (
        <section className="trainingsPage-container">
          <div className="trainingsPage-text">
            <h1>Welcome to IQtty training</h1>            
              Matrix tests are used in assessment centers to examine<br/>
              your skills in inductive reasoning.<br/>
              A matrix consists of nine boxes. One box is empty.<br/>
              Your task is to discover logical connections and compose<br/>
              the empty box based on the rule you found.<br/>            
              Please select your options & start a test.<br/>           

            <section id="selection">
              <article>
                <h3>Select the complexity of your Test:</h3>
                <li>
                  <label>
                    <input
                      name="complexity"
                      type="radio"
                      value="Low"
                      checked={true}
                      onChange={this.handleComplexity}
                    />
                    Low
                  </label>
                </li>

                <li>
                  <label>
                    <input
                      name="complexity"
                      type="radio"
                      value="Medium"
                      onChange={this.handleComplexity}
                    />
                    Medium
                  </label>
                </li>

                <li>
                  <label>
                    <input
                      name="complexity"
                      type="radio"
                      value="High"
                      onChange={this.handleComplexity}
                    />
                    High
                  </label>
                </li>

                <li>
                  <label>
                    <input
                      name="complexity"
                      type="radio"
                      value="Random"
                      onChange={this.handleComplexity}
                    />
                    Random
                  </label>
                </li>
              </article>
              <article>
                <h3>Time limit?</h3>

                <li>
                  <label>
                    <input
                      name="timeout"
                      type="radio"
                      value="yes"
                      onChange={this.handleTimeout}
                    />
                    Yes (90 sec per test case)
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      name="timeout"
                      type="radio"
                      value="no"
                      checked={true}
                      onChange={this.handleTimeout}
                    />
                    No
                  </label>
                </li>
              </article>
            </section>                       
          </div>
          <div className = "button-container">
              <Link to = {`/test/new/${this.state.complexity}/${this.state.timeout}`}>
                <button className="trainingsPage-button">Start Test</button>
              </Link>
            </div>
        </section>
      );
    }
  }

export default IqTraining;
