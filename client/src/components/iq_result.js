import React, { Component } from 'react';
import '../stylesheets/iq_result.css';
import { Link } from "react-router-dom";
import axios from "axios";

export class Iqresult extends Component {
    state = {
      result: []
    };

    handle

    componentDidMount() {
      console.log("App --> componentDidMount()")
      axios.get("/api/results")
          .then(response => {
              /* console.log("App --> Promise resolved") */
              this.setState({result: response.data});
          })
      .catch(err=>{
        console.log("Fehler bei iq_result Component Did mount", err);
      })
     
  }
 
  render() {
   /*  console.log(this.state.result);
    console.log(this.state.result.userName); */
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

        <div className="tableresult">
          <div className="resulttr1">
            <div className="resultth">Name :</div>
            <div className="resulttd">{this.state.result.userName}</div>
          </div>
          <div className="resulttr">
            <div className="resultth">Test Name :</div>
            <div className="resulttd">{this.state.result.testName}</div>
          </div>
          <div className="resulttr1">
            <div className="resultth">Elapsed Time :</div>
            <div className="resulttd">{this.state.result.elapsedTime}</div>
          </div>
          <div className="resulttr">
            <div className="resultth">Executed Cases :</div>
            <div className="resulttd">{this.state.result.numberOfCases}</div>
          </div>
          <div className="resulttr1">
            <div className="resultth">Your Score :</div>
            <div className="resulttd">{this.state.result.score}</div>
          </div>
          <div className="resulttr">
            <div className="resultth">Complexity :</div>
            <div className="resulttd">{this.state.result.complexity}</div>
          </div>
          <div className="resulttr1">
            <div className="resultth">Percentage :</div>
            <div className="resulttd">{ergebnis}</div>
          </div>
        </div>
        <div className="resultfooter">
          <h1>You have reached : {this.state.result.score}  Points</h1>
        </div>

        <div className="buttonbox">
          
          <button className="rbutton"> 
          <Link to="/training" style={{color:'white', textDecoration:'none'}}>
          Training
          </Link>
          </button>

         <button className="rbutton"> 
          <Link to="/resultlist" style={{color:'white', textDecoration:'none'}} >
          Resultlist
          </Link>
          </button>

        </div>
      </div>
    );
  }
}

export default Iqresult

