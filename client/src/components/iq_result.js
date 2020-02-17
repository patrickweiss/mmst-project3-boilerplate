import React, { Component } from 'react';
import '../stylesheets/iq_result.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default class Iqresult extends Component {

  constructor(props) {
    super(props);
    this.result = this.props.result;
  }

  componentDidMount() {
    //console.log(">>>> Mounted. Trying to store result...");
    //Send result to the DB
    axios
    .post("/api/results", this.result)
    .then((fromApi) => {
      //console.log("===== Result stored. ", fromApi.data);
    })
    .catch(err => {
      console.log("ERROR while storing the test result: ", err);
    });
  }

  componentWillUnmount() {
    //console.log(">>>> Unmounted...");
  }

  render() {
    
    const scores = this.result.score;
    const questions = this.result.numberOfCases;
    const ergebnis = (Math.round((scores / questions) * 100)).toString();

    return (
     
      <div className="resultPage">
        <div className="resultHeader">
          <h1>
            Result of your current test
          </h1>
        </div>

        <div className="tableresult">
          <div className="resulttr1">
            <div className="resultth">Test Name :</div>
            <div className="resulttd">{this.result.testName}</div>
          </div>
          <div className="resulttr">
            <div className="resultth">Complexity :</div>
            <div className="resulttd">{this.result.complexity}</div>
          </div>
          <div className="resulttr1">
            <div className="resultth">Executed Cases :</div>
            <div className="resulttd">{this.result.numberOfCases}</div>
          </div>
          <div className="resulttr">
            <div className="resultth">Elapsed Time :</div>
            <div className="resulttd">{this.result.elapsedTime} seconds</div>
          </div>
          
          <div className="resulttr1">
            <div className="resultth">Your Score :</div>
            <div className="resulttd">{this.result.score}</div>
          </div>
          
          <div className="resulttr">
            <div className="resultth">Percentage :</div>
            <div className="resulttd">{ergebnis} %</div>
          </div>
        </div>
        <div className="buttonbox">
          
        <Link to="/resultlist" style={{color:'white', textDecoration:'none'}} >
            <button className="rbutton">Resultlist</button>
        </Link>
        </div>
        </div>
    );
  }
}


