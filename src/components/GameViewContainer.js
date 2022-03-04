import React from 'react';
import QuestionCard from './QuestionCard';

const GameViewContainer = ({ questions }) => {
  let i = 0;
  console.log(questions)
  const questionCards = questions.map((question) => {
    console.log(question)
    return (
      <QuestionCard
        key={i++}
        question={question.question}
        incorrectAnswers={question.incorrect_answers}
        correctAnswer={question.correct_answer}
        id={question.id}
      />
    )
  })
  return (
    <section className='game-view-container'>
      {questionCards}
    </section>
  )

}

export default GameViewContainer;