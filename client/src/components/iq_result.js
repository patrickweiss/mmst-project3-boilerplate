import React, { Component } from 'react';
import '../stylesheets/iq_result.css';
import axios from "axios";

export class Iqresult extends Component {
    state = {
      result: []
    };

    componentDidMount() {
      console.log("App --> componentDidMount()")
      axios.get("/api/results")
          .then(response => {
              console.log("App --> Promise resolved")
              this.setState({result: response.data});
          })
      .catch(err=>{
        console.log("Fehler bei iq_result Component Did mount", err);
      })
     
  }
 
  render() {
    console.log(this.state.result);
    console.log(this.state.result.userName);
    let scores = this.state.result.score;
    let questions = this.state.result.numberOfCases;
    let ergebnis = (Math.round((scores / questions) * 100)).toString();
    console.log(typeof(ergebnis))
    return (
      <div className="resultPage">
        <div className="resultHeader">
          <h1>
            Result of your current test
          </h1>
        </div>

        <div className="table">
          <div className="tr1">
            <div className="th">Name :</div>
            <div className="td">{this.state.result.userName}</div>
          </div>
          <div className="tr">
            <div className="th">Test Name :</div>
            <div className="td">{this.state.result.testName}</div>
          </div>
          <div className="tr1">
            <div className="th">Elapsed Time :</div>
            <div className="td">{this.state.result.elapsedTime}</div>
          </div>
          <div className="tr">
            <div className="th">Executed Cases :</div>
            <div className="td">{this.state.result.numberOfCases}</div>
          </div>
          <div className="tr1">
            <div className="th">Your Score :</div>
            <div className="td">{this.state.result.score}</div>
          </div>
          <div className="tr">
            <div className="th">Complexity :</div>
            <div className="td">{this.state.result.complexity}</div>
          </div>
          <div className="tr1">
            <div className="th">Percentage :</div>
            <div className="td">{ergebnis}</div>
          </div>
        </div>
        <div>
          <h1>You have reached : {this.state.result.score}  Points</h1>
        </div>

        <div className="buttonbox">
          <form action="privat">
            <input className="rbutton" type="submit" value="Test Page" />
          </form>

          <form action="resultlist">
            <input className="rbutton" type="submit" value="See Resultlist" />
          </form>
        </div>
      </div>
    );
  }
}

export default Iqresult

