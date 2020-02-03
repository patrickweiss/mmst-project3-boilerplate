import React, { Component } from 'react';
import '../result.css';
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
              this.setState({ result: response.data })
          })
      console.log(this.state.result);
  }
 
  

  render() {
    return (
      <div className="resultPage">
        <div className="resultHeader">
          <h1>
            iqresults shall display the single result for the current test
          </h1>
        </div>

        <div className="table">
          <div className="tr1">
            <div className="th">Name :</div>
            <div className="td">Wally Wichtig</div>
          </div>
          <div className="tr">
            <div className="th">Test Name :</div>
            <div className="td">kommt aus der DB</div>
          </div>
          <div className="tr1">
            <div className="th">Elapsed Time :</div>
            <div className="td">345.345</div>
          </div>
          <div className="tr">
            <div className="th">Executed Cases :</div>
            <div className="td">7</div>
          </div>
          <div className="tr1">
            <div className="th">Your Score :</div>
            <div className="td">7</div>
          </div>
          <div className="tr">
            <div className="th">Complexity :</div>
            <div className="td">medium</div>
          </div>
          <div className="tr1">
            <div className="th">Percentage :</div>
            <div className="td">80</div>
          </div>
        </div>
        <div>
          <h1>Du hast so und so viel Punkte erreicht</h1>
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

