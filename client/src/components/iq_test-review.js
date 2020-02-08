import React, { Component } from 'react'
import '../iq_test-style.css';
import DiagramCanvas from './iq_diagram-canvas.js';
import {decodePicture} from "./iq_utils.js";
import axios from 'axios';

export default class TestReview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      test: null,   //Test obj from DB  
      cases: null,  //Array of cases from DB 
      caseIdx: 0
    }
  }
    
  compare(answer1, answer2) { 
    return (parseInt(answer1,16) === parseInt(answer2,16));
  }

  componentDidMount() {

    const resultId = this.props.match.params.resultId;
    
    console.log(">>>>>>> Result ID from Karin: ", resultId);

    axios.get(`/api/results/id/${resultId}`)
      .then(resultData => {
        const testId = resultData.data.testId;
        axios.get(`/api/tests/id/${testId}`)
        .then(testDataFromApi => {
          this.setState({
            result: resultData.data,
            test: testDataFromApi.data.testData,
            cases: testDataFromApi.data.arrayOfCases  
          })
        })
      })
  }


/*

    const testId = this.props.resultObj.testId;
    axios.get(`/api/tests/id/${testId}`)
      .then(resFromApi => {
        this.setState({
          test: resFromApi.data.testData,
          cases: resFromApi.data.arrayOfCases
        })
      });      
  }
  */

/*
- render:
     testName
     score
     list of
    	3x3 diagram matrix 
    	Your Answer
    	Correct/Incorrect
	More... button (shows TestCaseReview component)
*/

  render() {
  
    const test = this.state.test;
    const result = this.state.result;

    

    if (!test) return (null);  //render nothing if there is no test data


    console.log(">>>>>>RESULT OBJECT", result);
    console.log(">>>>>>TEST OBJECT", test);

    const listOfCasesJSX = this.state.cases.map((c,i) => 
           <li key = {c._id}> 
              Case {i+1}:  
              <div className="canvas-matrix">  
                <div className="board-row">
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line1.arg1)}/></div>
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line1.arg2)}/></div>
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line1.result)}/></div>
                </div>
                <div className="board-row">
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line2.arg1)}/></div>
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line2.arg2)}/></div>
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line2.result)}/></div>
                </div>
                <div className="board-row">
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line3.arg1)}/></div>
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line3.arg2)}/></div>
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(c.line3.result)}/></div>
                </div>
                <div className="board-row">  
                    Your answer <br/> is {this.compare(c.line3.result, result.answers[i]) ? " correct" : " wrong" } 
                    <div className="board-cell"><DiagramCanvas shapes={decodePicture(result.answers[i])}/></div>
                </div>
              </div>
           </li>);
    return (
      <div>
          <div id="header">
              <div><h2><span>Result for the test: </span> <span id="test-name">{test.testName}</span></h2></div>   
          </div>
          <ul>
             {listOfCasesJSX}
          </ul>
      </div>
    );

  }
}