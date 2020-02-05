import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IQttyTest from "./components/iq_test.js"
//import testData from "./iq_testData.json"

export default class App extends Component {

  render () {

    //const currentTest = testData[0];

    return (
      <div> 
        <IQttyTest testId={"random"}/>
      </div>
    )
  }
}