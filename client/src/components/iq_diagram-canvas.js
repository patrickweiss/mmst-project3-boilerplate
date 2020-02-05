import React, { Component } from 'react'
import Diagram from './iq_utils.js';

export default class DiagramCanvas extends Component {

    constructor(props) {
        super(props);
        this.size = 48; 
        this.diagram = null;
    }

    componentDidMount() {
        //console.log(">>>>>>>> componentDidMount...");
        const ctx = this.refs.canvas.getContext('2d');
        this.diagram = new Diagram (this.size, ctx, this.props.shapes);
        this.diagram._redraw();
    }

    componentDidUpdate() {
        //console.log(">>>>>>>> componentDidUpdate...");
        this.diagram.symbols = this.props.shapes;
        this.diagram._clear();
        this.diagram._redraw();
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={this.size} height={this.size}/>
            </div>
        )
    }
}



