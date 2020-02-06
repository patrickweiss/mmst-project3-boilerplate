import React, { Component } from 'react'
import '../iq_test-style.css';
import TestCase from './iq_test-case.js';
import Iqresult from "./iq_result";
import axios from 'axios';

export default class TestReview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      test: null,   //Test obj from DB  
      cases: null,  //Array of cases from DB 
      caseIdx: 0
    }
  }
    


  answerCorrect(answer) { 
    const sysAnswer = this.state.cases[this.state.currentCaseIdx].line3.result;
    const correct = (parseInt(answer,16) === parseInt(sysAnswer,16)); 
    console.log(">>> System answer: " + sysAnswer + " Your answer: " + answer + " is " + correct );
    return correct;
  }



  componentDidMount() {

    if (this.props.testId === "random")
      axios.get(`/api/tests/random`)  
        .then(resFromApi => {
          this.setState({
            test: resFromApi.data.testData,
            cases: resFromApi.data.arrayOfCases
          })
        });
    else 
      axios.get(`/api/tests/${this.props.testId}`)
        .then(resFromApi => {
          this.setState({
            test: resFromApi.data.testData,
            cases: resFromApi.data.arrayOfCases
          })
        });      
  }

  render() {
    if (this.state.endOfTest) {
      return (
        <div>
          <Iqresult />
        </div>
      );  //=> result page
    }
    else if (this.state.animOn) {
      //const curTest = this.props.test;
      const curTest = this.state.test;
      return (
          <div>
            <div id="header">
                <div><h2><span>Test: </span> <span id="test-name">{curTest.testName}</span></h2></div>   
                <div>
                    <h3 id="current-case">
                      Case: {this.state.currentCaseIdx + 1} / {this.state.cases.length}
                    </h3>
                </div>   
                <div><h3><span>Complexity: </span><span id="complexity">{curTest.complexity}</span></h3></div>                
            </div>
            <div>
              <img src="../loader.gif" alt="" width="300"/>
            </div>            
        </div>
      );
    }
    else if (this.state.currentCaseIdx === -1) {
      return (
        <div>
            <TestCase case={null} nextCaseHandler={this.nextCaseHandler} />
        </div>
      );
    }
    else {
      const curTest = this.state.test;
      const curCase = this.state.cases[this.state.currentCaseIdx];
      return (
        <div>
            <div id="header">
                <div><h2><span>Test: </span> <span id="test-name">{curTest.testName}</span></h2></div>   
                <div>
                    <h3 id="current-case">
                      Case: {this.state.currentCaseIdx + 1} / {this.state.cases.length}
                    </h3>
                </div>   
                <div><h3><span>Complexity: </span><span id="complexity">{curTest.complexity}</span></h3></div>  
            </div>
            <TestCase case={curCase} nextCaseHandler={this.nextCaseHandler} />
        </div>
      );
    }
  }
}