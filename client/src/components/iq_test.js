import React, { Component } from 'react'
import '../stylesheets/iq_test-style.css'
import TestCase from './iq_test-case.js';
import Iqresult from "./iq_result";
import axios from "axios";

export default class IQttyTest extends Component {
  constructor(props) {
    super(props);

    this.caseStartTimestamp = 0;
    this.testTime = 0; //sum of case times
    this.caseLimit =
    this.props.match.params.timeout === "yes" ? 90 * 1000 : 60 * 60 * 1000; //time limit per case
    this.animLimit = 2 * 1000; //time between cases
    this.caseTimer = 0;
    this.loadTimer = 0;
    this.currentScore = 0;
    this.testResult = null;

    this.state = {
      test: null, //Test obj from DB
      cases: null, //Array of cases from DB
      currentCaseIdx: -1,
      answers: [],
      endOfTest: false,
      animOn: false
    };
  }

  nextCaseHandler = answer => {
    clearTimeout(this.caseTimer);

    if (this.state.currentCaseIdx === -1) {
      //Load the first case
      this.setState({
        currentCaseIdx: this.state.currentCaseIdx + 1,
        animOn: true,
        endOfTest: false,
        answers: []
      });
      this.loadTimer = setTimeout(this.animTimeout.bind(this), this.animLimit);
      return;
    }

    if (this.state.currentCaseIdx === this.state.cases.length - 1) {
      //Finish the test

      this.testTime =
        this.testTime + (new Date().getTime() - this.caseStartTimestamp);

      const answersCopy = [...this.state.answers];
      answersCopy.push(answer);
      //check answer and update score
      this.currentScore = this.answerCorrect(answer)
        ? this.currentScore + 1
        : this.currentScore;

      this.finishTest(answersCopy);  //Promise inside!

      this.setState({answers: answersCopy, animOn: false, endOfTest: true });

      return;
    }

    this.testTime =
      this.testTime + (new Date().getTime() - this.caseStartTimestamp);

    //check answer and update score
    this.currentScore = this.answerCorrect(answer)
      ? this.currentScore + 1
      : this.currentScore;

    const answersCopy = [...this.state.answers];
    answersCopy.push(answer);
    this.setState({
      currentCaseIdx: this.state.currentCaseIdx + 1,
      animOn: true,
      endOfTest: false,
      answers: answersCopy
    });

    this.loadTimer = setTimeout(this.animTimeout.bind(this), this.animLimit);
  };

  animTimeout() {
    this.caseStartTimestamp = new Date().getTime();
    this.setState({ animOn: false });
    this.caseTimer = setTimeout(this.caseTimeout.bind(this), this.caseLimit);
  }

  caseTimeout() {
    this.nextCaseHandler("000000");
  }

  answerCorrect(answer) {
    const sysAnswer = this.state.cases[this.state.currentCaseIdx].line3.result;
    const correct = parseInt(answer, 16) === parseInt(sysAnswer, 16);
    //console.log(">>> System answer: " + sysAnswer + " Your answer: " + answer + " is " + correct );
    return correct;
  }

  finishTest(answers) {

    this.testResult = {
      userName: this.props.userName,
      testName: this.state.test.testName,
      complexity: this.state.test.complexity,
      elapsedTime: (this.testTime / 1000).toFixed(1),
      numberOfCases: this.state.test.cases.length,
      score: this.currentScore,
      answers: answers,
      testId: this.state.test._id
    };

  }

  componentDidMount() {
    if (this.props.match.params.complexity)
      axios
        .get(`/api/tests?complexity=${this.props.match.params.complexity}`)
        .then(resFromApi => {
          this.setState({
            test: resFromApi.data.testData,
            cases: resFromApi.data.arrayOfCases
          });
        });
    else
      axios
        .get(`/api/tests/id/${this.props.match.params.testId}`)
        .then(resFromApi => {
          this.setState({
            test: resFromApi.data.testData,
            cases: resFromApi.data.arrayOfCases
          });
        });
  }

  componentWillUnmount() {
    clearTimeout(this.caseTimer);
    clearTimeout(this.loadTimer);
  }

  render() {

    if (this.state.endOfTest)
      return (
        <div>
          <Iqresult result={this.testResult}/>
        </div>
      );

    else if (this.state.animOn) {
      //const curTest = this.props.test;
      const curTest = this.state.test;
      return (
        <div>
          <div id="header">
            <div>
              <h2>
                <span>Test: </span>{" "}
                <span id="test-name">{curTest.testName}</span>
              </h2>
            </div>
            <div>
              <h3>
                <span>Complexity: </span>
                <span id="complexity">{curTest.complexity}</span>
              </h3>
            </div>
            <div>
              <h3 id="current-case">
                Case: {this.state.currentCaseIdx + 1} /{" "}
                {this.state.cases.length}
              </h3>
            </div>
           
          </div>
          <div>
            <img src="/robot.gif" alt="" width="500" />
          </div>
        </div>
      );
    } else if (this.state.currentCaseIdx === -1) {
      return (
        <div >
          <div className="startPageFlex">
            <div className="startTestCase">
              <TestCase case={null} nextCaseHandler={this.nextCaseHandler} />
            </div>
            <div className="textStartPage">
              Your test has not started yet.
              <br />
              Now, you have time for getting familiar with the layout and
              buttons.
              <br /><br />
              The keyboard at the bottom consists of <span>24 buttons</span>{" "}
              representing <br />
              6 sets of shapes: lines, arcs, dots, stars and square, arrows, and
              circles.
              <br />
              By clicking on a button you are adding a corresponding shape to
              your <br />
              answer. By clicking it again you are revoking your choice. Please
              try.
              <br /><br />
              The <span>Reset button</span> will clear your answer completely.
              Try this one, too.
              <br /><br />
              The <span>Start Test</span> button will load the first test case
              and the test will begin.
            </div>
          </div>
        </div>
      );
    } else if (this.state.currentCaseIdx === 0) {
      const curTest = this.state.test;
      const curCase = this.state.cases[this.state.currentCaseIdx];
      return (
        
        <div >
          <div id="header">
            <div >
              <h2>
                <span>Test: </span>{" "}
                <span id="test-name">{curTest.testName}</span>
              </h2>
            </div>
            <div>
              <h3>
                <span>Complexity: </span>
                <span id="complexity">{curTest.complexity}</span>
              </h3>
            </div>
            <div>
              <h3 id="current-case">
                Case: {this.state.currentCaseIdx + 1} /{" "}
                {this.state.cases.length}
              </h3>
            </div>
            
          </div>
          <div className='startPageFlex2'>
          <div className='startTestCase2'>
               <TestCase case={curCase} nextCaseHandler={this.nextCaseHandler} />
          </div>

            <div className='textTestPage'>
              Your first test case is there!
              <br />
              In the 3x3 matrix you see a mix of shapes.
              <br /><br />
              Your first step is to identify the shape categories used.
              <br />
              Then, <b>for each category</b>, please analyze the logic applied to the
              category in rows 1 and 2. <br />
              Finally, choose your answer in row 3, using the same logic.
              <br /><br />
              When you are ready with your answer please Submit to proceed to
              the next test case.
              <br /><br />
              If you are interested, here is a small tip for you: the "logic" is
              based on the basic set operations: union, intersection,
              complement, and symmetric difference.
              <br />
             
            </div>

          </div>
        </div>
      );
    }
    else {
      const curTest = this.state.test;
      const curCase = this.state.cases[this.state.currentCaseIdx];
      return (
        
        <div className='testpage-background2' >
          <div id="header">
            <div >
              <h2>
                <span>Test: </span>{" "}
                <span id="test-name">{curTest.testName}</span>
              </h2>
            </div>
            <div>
              <h3>
                <span>Complexity: </span>
                <span id="complexity">{curTest.complexity}</span>
              </h3>
            </div>
            <div>
              <h3 id="current-case">
                Case: {this.state.currentCaseIdx + 1} /{" "}
                {this.state.cases.length}
              </h3>
            </div>
           
          </div>
          <div className='startPageFlex2'>
          <div className='startTestCase2'>
               <TestCase case={curCase} nextCaseHandler={this.nextCaseHandler} />
          </div>
          </div>
        </div>
      );

    }
  }
}
