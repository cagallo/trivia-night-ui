import React, { Component } from 'react'
import { apiCalls } from '../apiCalls'
import GameViewContainer from './GameViewContainer'
import ErrorPage from './ErrorPage'
import { shuffle } from '../utils'
import '../styles/TriviaGameView.css'


class TriviaGameView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: '',
			selectedCategory: [],
			userAnswer: null, 
			correctAnswer: '',
			currentIndex: 0,  
			possibleAnswers: [],       
			gameOver: false, 
			score: 0,   
			disabled: true,
			shuffledAnswers: []
		}
	}
  
	async componentDidMount() {
		console.log('ran componentDidMount')
		let category = this.props.category
		if (category === 'User Generated Questions') {
			category = 'User Generated Question'
		}
		try {
			let questions = (category !== 'All Categories') ? await apiCalls.getQuestionsByCategory(category) : await apiCalls.getAllCategories()

			console.log(questions)
			//TODO: remove
			//questions = questions.slice(0, 2)

			this.setState({ selectedCategory: questions })
			this.startGame()
		} catch (error) {
			console.log('error', error)
			this.setState({ error: error.message })
		}
	}

	startGame = () => {
		console.log('starting game...')
		const {currentIndex} = this.state
		const question = this.state.selectedCategory[currentIndex]
		const possibleAnswers = shuffle([...question.incorrect_answers, question.correct_answer])
		console.log(possibleAnswers)
		this.setState(() => {
			return {
				question: question.question,
				possibleAnswers: possibleAnswers,
				correctAnswer: question.correct_answer
			}
		})
	}

	handleNextQuestion = (correctAnswer) => {
		console.log('running handleNextQuestion')
		const {userAnswer, score} = this.state
		this.setState({ currentIndex: this.state.currentIndex + 1 })
		if (userAnswer === correctAnswer) { 
			this.setState ({
				score: score + 1
			})
		}
		this.finishGame()
	}

	componentDidUpdate(prevProps, prevState){
		console.log('ran componentDidUpdate')

		//TODO: fix this
		this.state.shuffledAnswers=[]
		const { currentIndex } = this.state
		if (currentIndex !== prevState.currentIndex 
      && currentIndex !== this.state.selectedCategory.length) {

			let currentQuestion = this.state.selectedCategory[currentIndex]
			console.log(currentQuestion)

			this.setState(() => {
				let testPossAnswers = shuffle([...currentQuestion.incorrect_answers, currentQuestion.correct_answer])
				console.log(testPossAnswers)
				return {
					disabled: true,
					question: currentQuestion.question,
					possibleAnswers: shuffle([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]),
					correctAnswer: currentQuestion.correct_answer          
				}
			})
		}
	}

	checkAnswer = (answer, shuffledAnswers) => {
		console.log('ran checkAnswer')
		this.setState({
			userAnswer: answer,
			disabled: false,
			shuffledAnswers: shuffledAnswers
		})
	}

	finishGame =() => {
		console.log('ran finish game')
		if (this.state.currentIndex === this.state.selectedCategory.length - 1) {
			this.setState({
				gameOver: true
			})
		}
	}

	render() {
		console.log('ran render')
		if (this.state.error) {
			return (
				<ErrorPage message={this.state.error}/>
			)
		}

		const currentIndex = this.state.currentIndex
		if (currentIndex > 0 && currentIndex === this.state.selectedCategory.length) {
			return (
				<div>
					<h2 className='game-over-msg'>Game Over. You got {((this.state.score / this.state.selectedCategory.length) * 100).toFixed(1)}% correct!</h2>
					<h2 className='correct-answers-msg'>The correct answers for the game are:</h2>
					<ol>
						{this.state.selectedCategory.map((question, index) => (
							<li className='options'
								key={index}>
                  Question {index + 1} : {question.correct_answer}
							</li>
						))}
					</ol>
					<p className='navigate-home'>Click on the Trivia Night icon above to choose a new category!</p>
				</div>
			)
		}

		return (
			<section className='trivia-game-view'>
				<div className='trivia-game-card'>
					<GameViewContainer 
						score={this.state.score} 
						disabled={this.state.disabled} 
						total={this.state.selectedCategory.length} 
						finishGame={this.finishGame} 
						checkAnswer={this.checkAnswer} 
						handleNextQuestion={this.handleNextQuestion} 
						questions={this.state.selectedCategory} 
						shuffledAnswers={this.state.shuffledAnswers} 
						index={currentIndex}/>
				</div>
			</section>
		)
	}
}

export default TriviaGameView