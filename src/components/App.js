import React, { Component } from 'react';
import '../styles/App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      triviaQuestions: []
    }
  }
  render() {
    return (
      <h1>Trivia Night</h1>
    )
  }
}

export default App;