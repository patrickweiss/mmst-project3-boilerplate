import React, { Component } from 'react';
import '../stylesheets/iq_admin.css';

export default class IqAdmin extends Component {
    render() {
        
        return (
            <div>
                <h1>Admin Page</h1>
                <div className="tableAdmin">
                <ul>
                <p>
               <li><button onclick= "generateComponents()">1. Components</button></li>
                </p>
                <p>
                <li><button onclick="generateCases()">2. Cases</button>
                Number of Components : <input  id="compNumber" type="number" max="6" min="1" alt="Number of Components"/></li>
                </p>
                <p>
                <button onclick="generateTests()">3. Tests</button>
                Number of Testcases : <input id="numbTc" type="number"  max="10" min="1"/>
                Max case complexity : <input id="caseComplexity" type="number" max="3" min="1"/>
                </p>
                </ul>
                </div>
            </div>
        )
    }
}
