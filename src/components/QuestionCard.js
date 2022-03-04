import React from "react";
import { shuffle } from '../utils';
import '../styles/QuestionCard.css';

const QuestionCard = ({question, incorrectAnswers, correctAnswer, id}) => {
  const possibleAnswers = shuffle([...incorrectAnswers, correctAnswer]);
  
  return (
    <section className="single-question-card" id={id}>
      <h3 className="current-question">{question}</h3>
      <div className="possible-answers-container">
        <div className="top-row-answers">
          <div className="top-left">
          <input type="radio" id="possibleAnswer1" name="answer-button" value="possibleAnswer1"></input>
          <label>{possibleAnswers[0]}</label>
          </div>
          <div className="top-right">
          <input type="radio" id="possibleAnswer2" name="answer-button" value="possibleAnswer2"></input>
          <label>{possibleAnswers[1]}</label>
          </div>
        </div>
        <div className="bottom-row-answers">
         <div className="bottom-left">
          <input type="radio" id="possibleAnswer3" name="answer-button" value="possibleAnswer3"></input>
          <label className="bottom-left">{possibleAnswers[2]}</label>
          </div>
          <div className="bottom-right">
          <input type="radio" id="possibleAnswer4" name="answer-button" value="possibleAnswer4"></input>
          <label>{possibleAnswers[3]}</label>
          </div>
        </div>
      </div>
      <div className="answer-button-container">
      <button className="submit-answer-button">Submit</button>
      </div>
    </section>
  )
  
}

export default QuestionCard;