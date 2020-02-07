
import React, { Component } from 'react';
import axios from 'axios';
import '../stylesheets/iq_resultlist.css';
import IQttyTest from "./iq_test"
import '../stylesheets/iq_resultlist.css'
import TestReview from "./iq_test-review"

class IqResultlist extends Component {
  
  state = {
    results: [],
    resultToReview: null,
    isTestAgainRequested: false        
    };      
         
    
  componentDidMount() {
      console.log("AllResults --> componentDidMount()")
      axios.get("/api/resultlist")
          .then(response => {
              console.log("AllResults --> Promise resolved")
              console.log("Promise resolved Data", response.data)
              this.setState({ results: response.data })
          })
          .catch(err => {
            console.log("Error occured: ", err);
          });
  }

testAgainHandler = (e) => {
    this.setState ({
        isTestAgainRequested: true        
    })
    console.log("I was clicked")
    console.log(e.target.id)
}

reviewClickHandler =  e => {
  const resultObj 
     = this.state.results.filter(r => {return (r._id === e.target.id)}
   )[0];
  this.setState({
   resultToReview: resultObj
 });
}

  render() {

    if (this.state.resultToReview) {
      return(
        <TestReview resultObj={this.state.resultToReview}/>
      );
    }

    if (this.state.isTestAgainRequested){  
      return <IQttyTest testId={"5e3abf53a48cd635d04e4f63"} />
    }
 
    const resultList = this.state.results.map(result => {
      let caseNumber = result.numberOfCases;
      let score = result.score;
      let resultInPercentage = Math.round(score/caseNumber * 100)

      return (
        <div className="trResultlist" key={result._id}>
          <div className="tdResultlist">{result.userName}</div>
          <div className="tdResultlist">{result.testName}</div>
          <div className="tdResultlist">{result.complexity}</div>
          <div className="tdResultlist">{result.elapsedTime}</div>
          <div className="tdResultlist">{result.numberOfCases}</div>
          <div className="tdResultlist">{result.score}</div>
          <div className="tdResultlist">{resultInPercentage} %</div>

          <button className="trainingsPage-button" id= {result.testId} onClick={this.testAgainHandler}>Test Again</button>
          
          <button className="trainingsPage-button" id={result._id} onClick={this.reviewClickHandler}>Review</button>
        </div>
      )

    })
      return(
        <div>      
        <div className = "resultlistPage">
          <section className= "table-resultlist">
            <h1 className="header">Your Test Results</h1>
            <div className="tableResultlist-box">        
              <div className="tableResultlist">
                <div className="trResultlist">
                  <div className="thResultlist">User</div>
                  <div className="thResultlist">Test</div>
                  <div className="thResultlist">Complexity</div>
                  <div className="thResultlist">Elapsed Time</div>
                  <div className="thResultlist">Number of Test Cases</div>
                  <div className="thResultlist">Score</div>
                  <div className="thResultlist">Result</div>
                  <div className="thResultlist"></div>
                </div>                  
               {resultList}      
              </div>
            </div>
          </section>
        </div>
      </div>

      )
    }
  }
  


export default IqResultlist;