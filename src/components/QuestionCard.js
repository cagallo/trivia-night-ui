import React from "react";
import { shuffle } from '../utils';

const QuestionCard = ({question, incorrectAnswers, correctAnswer, id}) => {
  const possibleAnswers = shuffle([...incorrectAnswers, correctAnswer]);
  
  return (
    <section className="single-question-card" id={id}>
      <h3>{question}</h3>
      <p>{possibleAnswers}</p>
    </section>
  )
  
}

export default QuestionCard;