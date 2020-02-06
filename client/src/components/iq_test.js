import React, { Component } from 'react'
import '../iq_test-style.css';
import TestCase from './iq_test-case.js';
import Iqresult from "./iq_result";
import axios from 'axios';

export default class IQttyTest extends Component {

  constructor(props) {
    super(props);

    this.caseStartTimestamp = 0;
    this.testTime = 0;            //sum of case times 
    this.caseLimit = 300 * 1000;  //time limit per case
    this.animLimit = 2 * 1000;    //time between cases
    this.caseTimer = 0;
    this.loadTimer = 0;
    this.currentScore = 0;

    this.state = {
      test: null,   //Test obj from DB  
      cases: null,  //Array of cases from DB 
      currentCaseIdx: -1,
      answers: [],
      endOfTest: false,
      animOn: false
    }
  }
    
  nextCaseHandler = (answer) => {
    clearTimeout(this.caseTimer);

    if (this.state.currentCaseIdx === - 1) {        //Load the first case
      this.setState ({
        currentCaseIdx: this.state.currentCaseIdx + 1,
        animOn: true,
        endOfTest: false,
        answers: []
      });
      this.loadTimer = setTimeout(this.animTimeout.bind(this), this.animLimit);
      return;
    }

    if (this.state.currentCaseIdx === this.state.cases.length - 1) {  //Finish the test

      this.testTime = this.testTime + ((new Date()).getTime() - this.caseStartTimestamp);

      const answersCopy = [...this.state.answers];
      answersCopy.push(answer)
      //check answer and update score
      this.currentScore = this.answerCorrect(answer) ? this.currentScore + 1 : this.currentScore;

      this.finishTest();

      this.setState({answers: answersCopy,
                     animOn: false,
                     endOfTest: true  
      });
      return;
    }
    
    this.testTime = this.testTime + ((new Date()).getTime() - this.caseStartTimestamp);
    
    //check answer and update score
    this.currentScore = this.answerCorrect(answer) ? this.currentScore + 1 : this.currentScore;

    const answersCopy = [...this.state.answers];
    answersCopy.push(answer)
    this.setState ({
      currentCaseIdx: this.state.currentCaseIdx + 1,
      animOn: true,
      endOfTest: false,
      answers: answersCopy
    });

    this.loadTimer = setTimeout(this.animTimeout.bind(this), this.animLimit);
    
  }

  animTimeout() {
    this.caseStartTimestamp = (new Date()).getTime();
    this.setState ({animOn: false});
    this.caseTimer = setTimeout(this.caseTimeout.bind(this), this.caseLimit);

  }
    
  caseTimeout() {
      this.nextCaseHandler("000000");
  }

  answerCorrect(answer) { 
    const sysAnswer = this.state.cases[this.state.currentCaseIdx].line3.result;
    const correct = (parseInt(answer,16) === parseInt(sysAnswer,16)); 
    console.log(">>> System answer: " + sysAnswer + " Your answer: " + answer + " is " + correct );
    return correct;
  }

  finishTest() {

    //NOTE: In order to store answers, a model extension will be required
    //Suggestion: store the testId as well

    const testResult = { 
      userName: this.props.userName, 
      testName: this.state.test.testName,
      complexity: this.state.test.complexity,
      elapsedTime: (this.testTime/1000).toFixed(1),
      numberOfCases: this.state.test.cases.length,
      score: this.currentScore
    }

    //Send result to the DB
    axios.post("/api/results", testResult) 
      .then(fromServer => {  
        console.log("Result stored. Response from server: " + fromServer.data);
      })
      .catch(err => {
        console.log("ERROR while storing the test result: ", err);
      });
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