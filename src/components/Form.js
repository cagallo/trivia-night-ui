import React, {Component} from 'react';
import '../styles/Form.css';
import { apiCalls } from '../apiCalls';

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

  submitNewQuestion = async(event) => {
    event.preventDefault(); 
    const newQuestion = {
      ...this.state // spreading in the title and description
    }
    console.log(newQuestion)
    await apiCalls.postNewQuestion(newQuestion)
    // this.props.addIdea(newIdea); // using the addIdea method from App that we x`passed as a prop to Form
    this.clearInputs(); // invoking the method I wrote below to reset the inputs
  }

  clearInputs = () => {
    this.setState({ question: '', incorrectAnswers: [], correctAnswer: '' });
  }

  render() {
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
              className='question-input'
              type='text'
              placeholder='Incorrect Answer 1'
              name='incorrectAnswers[0]'
              value={this.state.incorrectAnswers[0]}
              onChange={event => this.handleFormChange(event)}
            />
          </div>

          <div className='question-container'>
          <label className='label-form' htmlFor="incorrect-2">Incorrect Answer 2: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Incorrect Answer 2'
              name='incorrectAnswers[1]'
              value={this.state.incorrectAnswers[1]}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <div className='question-container'>
          <label className='label-form' htmlFor="incorrect-3">Incorrect Answer 3: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Incorrect Answer 3'
              name='incorrectAnswers[2]'
              value={this.state.incorrectAnswers[2]}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <div className='question-container'>
          <label className='label-form' htmlFor="correct">Correct Answer: </label>
            <input
              className='question-input'
              type='text'
              placeholder='Correct Answer'
              name='correctAnswer'
              defaultValue={this.state.correctAnswer}
              onChange={event => this.handleFormChange(event)}
            />  
          </div>

          <button className='new-question-button' onClick={event => this.submitNewQuestion(event)} >SUBMIT</button>
          </div>
      </form>
    )
  }
}

//help 

export default Form;