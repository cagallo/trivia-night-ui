import React, { Component } from 'react'
import { apiCalls } from '../apiCalls'
import GameViewContainer from './GameViewContainer'
import ErrorPage from './ErrorPage'
import PropTypes from 'prop-types'
import '../styles/TriviaGameView.css'


class TriviaGameView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			currentIndex: 0,
			score: 0,
			userSelectedAnswer: null, 
			correctAnswer: null,
			shuffledAnswers: [],
			currentQuestion: null,
			allQuestions: [],
			submitBtnDisabled: true
		}
	}
  
	async componentDidMount() {
		let category = this.props.category
		if (category === 'User Generated Questions') {
			category = 'User Generated Question'
		}

		let questions = []
		try {
			questions = (category !== 'All Categories') ? 
				await apiCalls.getQuestionsByCategory(category) : 
				await apiCalls.getAllCategories()
		} catch (error) {
			this.setState({ error: error })
		}

		this.startGame(questions)
	}

	startGame = (questions) => {
		const question = questions[this.state.currentIndex]
		this.setState({ 
			currentQuestion: question,
			allQuestions: questions
		})
	}

	handleNextQuestion = (correctAnswer) => {
		const { userSelectedAnswer, score } = this.state
		const newIndex = this.state.currentIndex + 1
		const nextQuestion = this.state.allQuestions[newIndex]

		this.setState({ 
			currentIndex: newIndex,
			currentQuestion: nextQuestion,
			shuffledAnswers: []
		})

		if (userSelectedAnswer === correctAnswer) { 
			this.setState ({
				score: score + 1
			})
		}
	}

	setAnswer = (answer, shuffledAnswers) => {
		this.setState({
			userSelectedAnswer: answer,
			submitBtnDisabled: false,
			shuffledAnswers: shuffledAnswers // set to ensure answers are not re-shuffled on every selection
		})
	}

	render() {
		if (this.state.error) {
			return (
				<ErrorPage message={this.state.error}/>
			)
		}

		const currentQuestionNumber = this.state.currentIndex
		if (!this.state.currentQuestion && currentQuestionNumber === 0) {
			return ''
		}

		if (currentQuestionNumber > 0 && currentQuestionNumber === this.state.allQuestions.length) {
			return (
				<div>
					<h2 className='game-over-msg'>Game Over. You got {((this.state.score / this.state.allQuestions.length) * 100).toFixed(1)}% correct!</h2>
					<h2 className='correct-answers-msg'>The correct answers for the game are:</h2>
					<ul>
						{this.state.allQuestions.map((question, index) => (
							<li className='options'
								key={index}>
                  Question {index + 1} : {question.correct_answer}
							</li>
						))}
					</ul>
					<p className='navigate-home'>Click on the Trivia Night icon above to choose a new category!</p>
				</div>
			)
		}

		return (
			<section className='trivia-game-view'>
				<div className='trivia-game-card'>
					<GameViewContainer
						currentQuestion={this.state.currentQuestion}
						index={currentQuestionNumber}
						totalQuestions={this.state.allQuestions.length}
						shuffledAnswers={this.state.shuffledAnswers}
						submitBtnDisabled={this.state.submitBtnDisabled} 
						setAnswer={this.setAnswer}
						handleNextQuestion={this.handleNextQuestion}
					/>
				</div>
			</section>
		)
	}

}

export default TriviaGameView

TriviaGameView.propTypes = {
	category: PropTypes.string
}