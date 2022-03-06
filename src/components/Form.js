import React, {Component} from 'react';
import '../styles/Form.css';
import { apiCalls } from '../apiCalls';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      question: '',
      incorrect_answers: [],
      correct_answer: '',
      posted: false,
      error: ''
    }
  }

  handleFormChange = event => {
    const inputType = event.target.className;
    if (inputType === 'incorrect-answer-input') {
      this.setState({
        incorrect_answers: [...this.state.incorrect_answers, event.target.value]
      })
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  submitNewQuestion = async(event) => {
    event.preventDefault();
    const newQuestion = {
      ...this.state 
    }
    delete newQuestion.posted;
    delete newQuestion.error;
    
    try {
      await apiCalls.postNewQuestion(newQuestion)
    } 
    catch(error) {
      this.setState( {error: error.message} )
    }

    this.setState({
      posted: true
    })
  
    setTimeout(() => {
      this.clearInputs(); 
    }, 5000)
    
  }

  clearInputs = () => {
    this.setState({ question: '', incorrect_answers: [], correct_answer: '', posted: false });
  }

  render() {
    if(this.state.error) {
      return (
        <h1>{`${this.state.error}`}</h1>
      )
    }
    if (this.state.posted) {
      return (
        <div className="post-sucess">
          <h1 className="message">{`Your question" ${this.state.question} was created successfully!`}</h1>
        </div>
      )
    }
    return (
      <form>
        <h2 className='add-question-text'>Add a New Question</h2>
        <div className='form-container'>
          <div className='question-container'>
            <label className='label-form' htmlFor="question">Question: </label>
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
          <label className='label-form' htmlFor="incorrect-1">Incorrect Answer 1: </label>
            <input
              className='incorrect-answer-input'
              type='text'
              placeholder='Incorrect Answer 1'
              name='incorrectAnswers[0]'
              value={this.state.incorrect_answers[0]}
              onChange={event => this.handleFormChange(event)}
            />
          </div>

          <div className='question-container'>
          <label className='label-form' htmlFor="incorrect-2">Incorrect Answer 2: </label>
            <input
              className='incorrect-answer-input'
              type='text'
              placeholder='Incorrect Answer 2'
              name='incorrectAnswers[1]'
              value={this.state.incorrect_answers[1]}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <div className='question-container'>
          <label className='label-form' htmlFor="incorrect-3">Incorrect Answer 3: </label>
            <input
              className='incorrect-answer-input'
              type='text'
              placeholder='Incorrect Answer 3'
              name='incorrectAnswers[2]'
              value={this.state.incorrect_answers[2]}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <div className='question-container'>
          <label className='label-form' htmlFor="correct">Correct Answer: </label>
            <input
              className='correct-answer-input'
              type='text'
              placeholder='Correct Answer'
              name='correct_answer'
              defaultValue={this.state.correct_answer}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <button className='new-question-button' onClick={event => this.submitNewQuestion(event)} >SUBMIT</button>
          </div>
      </form>
    )
  }
}

export default Form;