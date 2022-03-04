import React, { Component } from 'react';
import { apiCalls } from '../apiCalls';
import GameViewContainer from './GameViewContainer';

class TriviaGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
      error: ''
    }
  }

  async componentDidMount() {
    console.log(this.props);
    console.log('we mounted')
    const category = this.props.category;
    try {
      const data = (category !== 'All Movies') ? await apiCalls.getQuestionsByCategory(category) : await apiCalls.getAllQuestions();
      let questions = data;
      console.log(questions)
      this.setState({ selectedCategory: questions })
    }
    catch (error) {
      this.setState({ error: error.message })
    }
  }

  // formatQuestion = (questions) => {
  //   console.log(questions)
  //   let i = 0;
  //   const questionCards = questions.map((question) => {
  //     console.log(question)
  //     return (
  //       <QuestionCard
  //         key={i++}
  //         question={question.question}
  //         incorrectAnswers={question.incorrect_answers}
  //         correctAnswer={question.correct_answer}
  //         id={question.id}
  //       />
  //     )
  //   })
    // return (
    //   <section className='trivia-game-card'>
    //     {questionCards}
    //   </section>
    // )
  // }

  render() {
    console.log(this.state.selectedCategory)
    return (
      <section className='trivia-game-card'>
        <GameViewContainer questions={this.state.selectedCategory}/>
      </section>
    )
  }
}

export default TriviaGameView;