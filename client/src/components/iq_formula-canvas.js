import React, { Component } from 'react'
import '../iq_test-style.css';
import DiagramCanvas from './iq_diagram-canvas.js';
import {decodePicture} from "./iq_utils.js";


export default class FormulaCanvas extends Component {

  catPic = (catName, hexPic) => {
    //returns hex picture for one category
    const idx = "ABCDEF".indexOf(catName.toUpperCase());
        
    //Padding leading zeros to get the hexPic of LENGTH 6!!!
    const padded = "0000000000" + hexPic;
    const valid = padded.substr(padded.length - 6);
    let catPicArr = valid.split("").map((c,i) => (i === idx) ? c : "0");
    return catPicArr.join("");
  }

  render() {

    const catName = this.props.catName;
    const opName = this.props.opName;
    const line = this.props.line;
    const lineNum = this.props.lineNum;

    return (
      <div className="formula-row">
        <div className="formula-cell"><DiagramCanvas shapes={["Left"]}/></div>
        <div className="board-cell"><DiagramCanvas shapes={decodePicture(this.catPic(catName, line.arg1))}/></div>
        
        <div className="formula-cell"><DiagramCanvas 
            shapes={(opName === "NAND" || opName === "NOR") ? [opName.substr(1)] : [opName]}/></div>
        <div className="board-cell"><DiagramCanvas shapes={decodePicture(this.catPic(catName, line.arg2))}/></div>
        
        <div className="formula-cell"><DiagramCanvas 
            shapes={(opName === "NAND" || opName === "NOR") ? ["RightCompl"] : ["Right"]}/></div> 
        <div className={(lineNum===3) ? "answer-cell-ok" : "board-cell"}><DiagramCanvas shapes={decodePicture(this.catPic(catName, line.result))}/></div>
      </div>

    );
  }
}

