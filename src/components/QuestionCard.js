import React from 'react'
import '../styles/QuestionCard.css'

const QuestionCard = (props) => {
	const possibleAnswers = [...props.shuffledAnswers, props.correctAnswer]
	console.log(possibleAnswers)
	return (
		<section className="single-question-card" id={props.id}>
			<span className="question-total">{`Question ${props.index + 1} of ${props.total}`}</span>
			<h3 className="current-question">{props.question}</h3>
			<div className="possible-answers-container">
				<div className="top-row-answers">
					<div className="top-left">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer1" name="answer-button" value="possibleAnswer1" onClick={() => {
								console.log('clicked')
								props.checkAnswer(possibleAnswers[0], props.shuffledAnswers)
							}}></input>
							<label className="possible-answer">{possibleAnswers[0]}</label>
						</div>
					</div>
					<div className="top-right">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer2" name="answer-button" value="possibleAnswer2" onClick={() => {
								props.checkAnswer(possibleAnswers[1], props.shuffledAnswers)
							}}></input>
						</div>
						<label className="possible-answer">{possibleAnswers[1]}</label>
					</div>
				</div>
				<div className="bottom-row-answers">
					<div className="bottom-left">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer3" name="answer-button" value="possibleAnswer3" onClick={() => {
								props.checkAnswer(possibleAnswers[2], props.shuffledAnswers)
							}}></input>
							<label className="possible-answer">{possibleAnswers[2]}</label>
						</div>
					</div>
					<div className="bottom-right">
						<div className="radio-button">
							<input type="radio" id="possibleAnswer4" name="answer-button" value="possibleAnswer4" onClick={() => {
								props.checkAnswer(possibleAnswers[3], props.shuffledAnswers)
							}}></input>
							<label className="possible-answer">{possibleAnswers[3]}</label>
						</div>
					</div>
				</div>
			</div>
			<div className="answer-button-container">
				<button disabled={props.disabled} className="submit-answer-button" onClick={() => {
					console.log('clicked')
					props.handleNextQuestion(props.correctAnswer)
				}}>Submit</button>
			</div>
		</section>
	)
  
}

export default QuestionCard