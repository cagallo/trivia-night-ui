import React from 'react'
import { shuffle } from '../utils'
import '../styles/QuestionCard.css'
import PropTypes from 'prop-types'

const QuestionCard = (props) => {
	const currentQuestion = props.currentQuestion
	const correctAnswer = currentQuestion.correct_answer

	let possibleAnswers = shuffle(currentQuestion.incorrect_answers, correctAnswer)
	if (props.shuffledAnswers.length > 0) {
		possibleAnswers = props.shuffledAnswers
	}

	let option1,option2,option3,option4
	[option1, option2, option3, option4] = [...possibleAnswers]

	return (
		<section className="single-question-card" id={currentQuestion.id}>
			<span className="question-total">{`Question ${props.index + 1} of ${props.totalQuestions}`}</span>
			<h3 className="current-question">{currentQuestion.question}</h3>
			<div className="possible-answers-container">
				<div className="top-row-answers">
					<div className="top-left">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer1" name="answer-button" value="possibleAnswer1" onClick={() => {
								props.setAnswer(option1, possibleAnswers)
							}}></input>
							<label className="possible-answer">{option1}</label>
						</div>
					</div>
					<div className="top-right">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer2" name="answer-button" value="possibleAnswer2" onClick={() => {
								props.setAnswer(option2, possibleAnswers)
							}}></input>
						</div>
						<label className="possible-answer">{option2}</label>
					</div>
				</div>
				<div className="bottom-row-answers">
					<div className="bottom-left">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer3" name="answer-button" value="possibleAnswer3" onClick={() => {
								props.setAnswer(option3, possibleAnswers)
							}}></input>
							<label className="possible-answer">{option3}</label>
						</div>
					</div>
					<div className="bottom-right">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer4" name="answer-button" value="possibleAnswer4" onClick={() => {
								props.setAnswer(option4, possibleAnswers)
							}}></input>
							<label className="possible-answer">{option4}</label>
						</div>
					</div>
				</div>
			</div>
			<div className="answer-button-container">
				<button disabled={props.submitBtnDisabled} className="submit-answer-button" onClick={() => {
					props.handleNextQuestion(correctAnswer)
				}}>Submit</button>
			</div>
		</section>
	)
  
}

export default QuestionCard

QuestionCard.propTypes = {
	currentQuestion: PropTypes.string,
	shuffledAnswers: PropTypes.array,
	index: PropTypes.number,
	totalQuestions: PropTypes.number,
	setAnswer: PropTypes.func, 
	submitBtnDisabled: PropTypes.func,
	handleNextQuestion: PropTypes.func

}