import React, { Component } from 'react'
import "../stylesheets/iq_training.css"

class IqTraining extends Component {
  render() {
    return (
      <section className = "trainingsPage-container">
        <div>
          <h1>Welcome to IQtty training</h1>
          <p>Matrix tests are used in assessment centers to examine your skills in inductive reasoning.</p>
          <p>A matrix consists of nine boxes. One box is empty.</p>
          <p>Your task is to discover logical connections and compose the empty box based on the rule you found.</p>
          <p>Click here to start a test</p>
          
          <form className="trainingsPage-button-box" action = "/test/new" >          
              <input className="trainingsPage-button" type="submit" value="Start test"/>
          </form>    
          
          <p>Your results you can find under
            <a href="/resultlist"> Test Result List</a>
          </p>        
        </div>
      </section>
    )
  }
}

export default IqTraining;