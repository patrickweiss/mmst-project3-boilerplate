import React, { Component } from 'react'
import '../stylesheets/iq_test-style.css';
import DiagramCanvas from './iq_diagram-canvas.js';
import {decodePicture, encodePicture} from "./iq_utils.js";

export default class TestCase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answer: [],
            btnStates: {A1:"off", B1:"off", C1:"off", D1:"off", E1:"off", F1:"off",
                        A2:"off", B2:"off", C2:"off", D2:"off", E2:"off", F2:"off",
                        A3:"off", B3:"off", C3:"off", D3:"off", E3:"off", F3:"off",
                        A4:"off", B4:"off", C4:"off", D4:"off", E4:"off", F4:"off"}
        }
    }


    selectShapeHandler = (e) => {
        const btnShape = e.currentTarget.id;
        const newAnswer = [...this.state.answer];
        const newBtnStates = {...this.state.btnStates};

        if (newBtnStates[btnShape] === "off") {//adding to the Answer, duplicates not allowed
            if (newAnswer.indexOf(btnShape) < 0) {
              newAnswer.push(btnShape);
              newBtnStates[btnShape] = "on";
              this.setState ({answer: newAnswer, btnStates: newBtnStates});
            }
        }
        else if (newBtnStates[btnShape] === "on") {//removing from the Answer,
            if (newAnswer.indexOf(btnShape) >= 0) {
                newAnswer.splice(newAnswer.indexOf(btnShape), 1);
                newBtnStates[btnShape] = "off";
                this.setState ({answer: newAnswer, btnStates: newBtnStates});
            }
        }
    }

    resetAnswerHandler = () => {
        const btnStatesCopy = {...this.state.btnStates};
        for (let key in btnStatesCopy) btnStatesCopy[key] = "off";
        this.setState ({answer: [], btnStates: btnStatesCopy});
    }

    nextCaseHandler = () => {
        this.props.nextCaseHandler(encodePicture(this.state.answer))
        this.resetAnswerHandler();
    }

           
    render() {

        const init = (this.props.case === null); 
  
        return (
            <div>

                <div id ="test-and-loader">

                    <div id="test-container">
                        <div className="canvas-matrix">  
                            <div className="board-row">
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line1.arg1)}/></div>
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line1.arg2)}/></div>
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line1.result)}/></div>
                            </div>
                            <div className="board-row">
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line2.arg1)}/></div>
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line2.arg2)}/></div>
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line2.result)}/></div>
                            </div>
                            <div className="board-row">
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line3.arg1)}/></div>
                                <div className="board-cell"><DiagramCanvas shapes={init ? [] : decodePicture(this.props.case.line3.arg2)}/></div>
                                <div className="board-cell"><DiagramCanvas shapes={this.state.answer}/></div>
                            </div>
                        </div>
                        <div id="nav-buttons">
                            <button className={init ? "nav-btn-init shake": "nav-btn"}   
                                    onClick={this.nextCaseHandler}> {init ? "Start Test": "Submit"} </button>
                            <button className="nav-btn"  
                                    onClick={this.resetAnswerHandler}>Reset</button>
                        </div>
                    </div>
                </div>
                
                <div className="canvas-matrix">
                    <div className="menu-row">
                        {["A","B","C","D","E","F"].map(c =>                     
                        <button className={"menu-btn-"+this.state.btnStates[c+1]} 
                                key={c+1} id={c+1} onClick={this.selectShapeHandler} >
                            <DiagramCanvas shapes={[c+1]} />
                        </button>
                        )}
                    </div>
                    <div className="menu-row">
                        {["A","B","C","D","E","F"].map(c =>                     
                        <button className={"menu-btn-"+this.state.btnStates[c+2]} 
                                key={c+2} id={c+2} onClick={this.selectShapeHandler}>
                            <DiagramCanvas shapes={[c+2]} />
                        </button>
                        )}
                    </div>
                    <div className="menu-row">
                        {["A","B","C","D","E","F"].map(c =>                     
                        <button className={"menu-btn-"+this.state.btnStates[c+3]} 
                                key={c+3} id={c+3} onClick={this.selectShapeHandler}>
                            <DiagramCanvas shapes={[c+3]} />
                        </button>
                        )}
                     </div>
                    <div className="menu-row">
                        {["A","B","C","D","E","F"].map(c =>                     
                        <button className={"menu-btn-"+this.state.btnStates[c+4]} 
                                key={c+4} id={c+4} onClick={this.selectShapeHandler}>
                            <DiagramCanvas shapes={[c+4]} />
                        </button>
                        )}                        
                    </div>
                </div>
            </div>

        )
    }
}