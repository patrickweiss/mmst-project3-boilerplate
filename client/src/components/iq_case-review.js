import React, { Component } from 'react'
import '../stylesheets/iq_test-style.css';
import FormulaCanvas from "./iq_formula-canvas.js";

export default class CaseReview extends Component {

  constructor(props) {
    super(props);
    this.case = this.props.caseObj;
  }
    
  render() {

    const ops = ["AND","NAND","OR","NOR","XOR"];
    const opDesc = ["Intersection (AND)", "Complement of Intersection (NOT AND)", "Union (OR)", "Complement of Union (NOT OR)","Symmetric Difference (XOR)"];

    const listOfComponentsJSX = this.case.catOps.map((c,i) => 
        <li key = {c._id} className="case-comp"> 
            
            <div className="canvas-matrix">  
              <FormulaCanvas opName={c.opName} catName={c.catName} line={this.case.line1} lineNum = {1}/>
              <FormulaCanvas opName={c.opName} catName={c.catName} line={this.case.line2} lineNum = {2}/>
              <FormulaCanvas opName={c.opName} catName={c.catName} line={this.case.line3} lineNum = {3}/>
            </div>
            <br/>
            <div className="op-desc">{opDesc[ops.indexOf(c.opName)]}</div>       

        </li>);

    return (
      <div>
          <ul className="case-comp-list">
             {listOfComponentsJSX}
          </ul>
      </div>
    );
  }
}

