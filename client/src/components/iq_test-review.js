import React, { Component } from 'react'
import '../iq_test-style.css';
import DiagramCanvas from './iq_diagram-canvas.js';
import {decodePicture} from "./iq_utils.js";
import {Link} from "react-router-dom";
import CaseReview from "./iq_case-review";
import axios from 'axios';

export default class TestReview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      test: null,  //Test obj from DB  
      cases: [],  //Array of cases from DB 
      isDetailView: []  
    }
  }
    
  compare(answer1, answer2) { 
    return (parseInt(answer1,16) === parseInt(answer2,16));
  }

  componentDidMount() {

    const testId = this.props.resultObj.testId;
    axios.get(`/api/tests/id/${testId}`)
      .then(resFromApi => {
        this.setState({
          test: resFromApi.data.testData,
          cases: resFromApi.data.arrayOfCases,
          isDetailView: resFromApi.data.arrayOfCases.map (c => false) 
        })
      });      
  }

  lessBtnHandler =  e => {
    console.log("LESS button clicked for case ", e.target.id);
    const isDetailViewCopy = [...this.state.isDetailView];
    isDetailViewCopy[e.target.id] = false;
    this.setState ({
      isDetailView: isDetailViewCopy
    })
  }

  moreBtnHandler =  e => {
    console.log("MORE button clicked for case ", e.target.id);
    const isDetailViewCopy = [...this.state.isDetailView];
    isDetailViewCopy[e.target.id] = true;
    this.setState ({
      isDetailView: isDetailViewCopy
    })
  }


  render() {
    const test = this.state.test;
    const result = this.props.resultObj;

    if (!test) return (null);  //render nothing if there is no test data

    const listOfCasesJSX = this.state.cases.map((c,i) => 
           <li key = {c._id} > 
              <h5>Case {i+1}</h5>
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
                      <div>Your answer <br/> is correct</div> 
                      <div className="answer-cell-ok"><DiagramCanvas shapes={decodePicture(result.answers[i])}/></div>  
                    </div>                   
                   :
                    <div className="answer-row">  
                      <div>Your answer <br/> is wrong</div> 
                      <div className="answer-cell-err"><DiagramCanvas shapes={decodePicture(result.answers[i])}/></div>   
                    </div>            
                  }

              </div>
              {(this.state.isDetailView[i]) ?
                 <div className="case-rev">
                   <div><button id={i} onClick={this.lessBtnHandler}>less...</button></div>
                   <div><CaseReview caseObj={c} caseIdx={i} answer={c.line3.result}/></div>
                 </div>
                 :
                 <div className="case-rev">
                   <div><button id={i} onClick={this.moreBtnHandler}>more...</button></div>
                 </div>
              }
            </div>
           </li>);

    return (
      <div>
          <div id="header">
              <div><h4><span>Result for the test </span> <span id="test-name">{test.testName}</span></h4></div>   
          </div>
          <ul>
             {listOfCasesJSX}
          </ul>
          <Link to="/resultlist"> Back to Result List</Link>
      </div>
    );
  }
}