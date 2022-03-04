import React, {Component} from 'react';
import '../styles/Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      incorrectAnswers: [],
      correctAnswer: ''
    }
  }

  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form>
        <h2 className='add-question-text'>Add a New Question</h2>
        <div className='form-container'>
          <div className='question-container'>
            <label className='label-form' for="question">Question: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Question'
              name='question'
              value={this.state.question}
              onChange={event => this.handleFormChange(event)}
            />
          </div>
        
          <div className='question-container'>
          <label className='label-form' for="incorrect-1">Incorrect Answer 1: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Incorrect Answer 1'
              name='incorrect-1'
              value={this.state.incorrectAnswers[0]}
              onChange={event => this.handleFormChange(event)}
            />
          </div>

          <div className='question-container'>
          <label className='label-form' for="incorrect-2">Incorrect Answer 2: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Incorrect Answer 2'
              name='incorrect-2'
              value={this.state.incorrectAnswers[1]}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <div className='question-container'>
          <label className='label-form' for="incorrect-3">Incorrect Answer 3: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Incorrect Answer 3'
              name='incorrect-3'
              value={this.state.incorrectAnswers[2]}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <div className='question-container'>
          <label className='label-form' for="correct">Correct Answer: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Correct Answer'
              name='correct'
              value={this.state.correctAnswer}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <button className='new-question-button'>SUBMIT</button>
          </div>
      </form>
    )
  }
}

export default Form;