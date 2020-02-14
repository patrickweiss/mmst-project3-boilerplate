import React, { Component } from 'react'
import '../stylesheets/iq_test-style.css';
import DiagramCanvas from './iq_diagram-canvas.js';
import {decodePicture} from "./iq_utils.js";
import CaseReview from "./iq_case-review";
import axios from 'axios';

export default class TestReview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      test: null,  //Test obj from DB  
      cases: [],  //Array of cases from DB 
      result: null,
      isDetailView: [true]  
    }
  }
    
  compare(answer1, answer2) { 
    return (parseInt(answer1,16) === parseInt(answer2,16));
  }

  componentDidMount() {

    const resultId = this.props.match.params.resultId;
    
    //console.log(">>>>>>> Result ID from Karin: ", resultId);

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

  lessBtnHandler =  e => {
    const isDetailViewCopy = [...this.state.isDetailView];
    isDetailViewCopy[e.target.id] = false;
    this.setState ({
      isDetailView: isDetailViewCopy
    })
  }

  moreBtnHandler =  e => {
    const isDetailViewCopy = [...this.state.isDetailView];
    isDetailViewCopy[e.target.id] = true;
    this.setState ({
      isDetailView: isDetailViewCopy
    })
  }


  render() {
    const test = this.state.test;
    const result = this.state.result;

    if (!test) return (null);  //render nothing if there is no test data

    const d = new Date(result.createdAt);
    const resDate = d.getDate() + "/" + (1+d.getMonth()) + "/" + d.getFullYear();
    const resTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    //console.log(">>>>>>RESULT OBJECT", result);
    //console.log(">>>>>>TEST OBJECT", test);

    const listOfCasesJSX = this.state.cases.map((c,i) => 
           <li key = {c._id} > 
              <h5><b>Case {i+1}</b></h5>
              <div className="test-rev-row">
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
                    <div className="answer-cell-ok"><DiagramCanvas shapes={decodePicture(c.line3.result)}/></div>
                </div>

                  {(this.compare(c.line3.result, result.answers[i])) ?
                    <div className="answer-row">  
                      <div><b>Your answer <br/> is correct</b></div> 
                      <div className="answer-cell-ok"><DiagramCanvas shapes={decodePicture(result.answers[i])}/></div>  
                    </div>                   
                   :
                    <div className="answer-row">  
                      <div><b>Your answer <br/> is wrong</b></div> 
                      <div className="answer-cell-err"><DiagramCanvas shapes={decodePicture(result.answers[i])}/></div>   
                    </div>            
                  }

              </div>
              {(this.state.isDetailView[i]) ?
                 <div className="case-rev">
                   <div><button id={i} className="more-less-btn" onClick={this.lessBtnHandler}>less...</button></div>
                   <div><CaseReview caseObj={c} caseIdx={i} answer={c.line3.result}/></div>
                 </div>
                 :
                 <div className="case-rev">
                   <div><button id={i} className="more-less-btn" onClick={this.moreBtnHandler}>more...</button></div>
                 </div>
              }
            </div>
           </li>);

    return (
      <div>
          <div id="header">
            <div><h4 id="test-name">Result for the <b>Test {test.testName}</b> of {resDate} at {resTime}</h4></div>  
            <br/> 
          </div>
          <ul>
             {listOfCasesJSX}
          </ul>          
      </div>
    );
  }
}