
import React, { Component } from 'react';
import axios from 'axios';
import '../resultlist.css'

class IqResultlist extends Component {
    /* constructor(){
      state = {
        results: []        
      };        
    } */
    

  render() {
    return (
      <div class="table">
        <div class="tr">
          <div class="td">Testname</div>
          <div class="td">Complexity</div>
          <div class="td">Elapsed Tine</div>
          <div class="td">Number of Cases</div>
          <div class="td">Scores</div>
          <div class="td">Result in Percentage</div>
      </div>
  </div>
    )
  }
}

export default IqResultlist;