import React, {Component} from 'react'
import '../styles/Form.css'
import { apiCalls } from '../apiCalls'

class Form extends Component {
	constructor() {
		super()
		this.state = {
			question: '',
			incorrect_answer_1: '',
			incorrect_answer_2: '',
			incorrect_answer_3: '',
			correct_answer: '',
			posted: false,
			error: ''
		}
	}

	handleFormChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	submitNewQuestion = async(event) => {
		event.preventDefault()
  
		const userQuestion = {
			question: this.state.question,
			incorrect_answers: [this.state.incorrect_answer_1, this.state.incorrect_answer_2, this.state.incorrect_answer_3],
			correct_answer: this.state.correct_answer,
		}
    
		try {
			await apiCalls.postNewQuestion(userQuestion)
		} 
		catch(error) {
			this.setState( {error: error.message} )
		}

		this.setState({
			posted: true
		})
  
		setTimeout(() => {
			this.resetState() 
		}, 5000)
    
	}

	resetState = () => {
		this.setState({ question: '', incorrect_answers: [], correct_answer: '', posted: false })
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
					<h1 className="message">{`Your question:\n "${this.state.question}" was created successfully!`}</h1>
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
							defaultValue=''
							onChange={event => this.handleFormChange(event)}
						/>
					</div>
					<div className='question-container'>
						<label className='label-form' htmlFor="incorrect-1">Incorrect Answer 1: </label>
						<input
							className='question-input'
							type='text'
							placeholder='Incorrect Answer 1'
							name='incorrect_answer_1'
							defaultValue=''
							onChange={event => this.handleFormChange(event)}
						/>
					</div>
					<div className='question-container'>
						<label className='label-form' htmlFor="incorrect-2">Incorrect Answer 2: </label>
						<input
							className='question-input'
							type='text'
							placeholder='Incorrect Answer 2'
							defaultValue=''
							name='incorrect_answer_2'
							onChange={event => this.handleFormChange(event)}
						/>  
					</div>
					<div className='question-container'>
						<label className='label-form' htmlFor="incorrect-3">Incorrect Answer 3: </label>
						<input
							className='question-input'
							type='text'
							placeholder='Incorrect Answer 3'
							defaultValue=''
							name='incorrect_answer_3'
							onChange={event => this.handleFormChange(event)}
						/>  
					</div>
					<div className='question-container'>
						<label className='label-form' htmlFor="correct">Correct Answer: </label>
						<input
							className='question-input'
							type='text'
							placeholder='Correct Answer'
							name='correct_answer'
							defaultValue=''
							onChange={event => this.handleFormChange(event)}
						/>  
					</div>

					<button className='new-question-button' onClick={event => this.submitNewQuestion(event)}>SUBMIT</button>
				</div>
			</form>
		)
	}
}

export default Form