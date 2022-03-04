import React, { Component } from 'react';
import { apiCalls } from '../apiCalls';
import GameViewContainer from './GameViewContainer';
import { shuffle } from '../utils';

class TriviaGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: [],
      currentIndex: 0,
      error: '',
      score: 0
      // possibleAnswers: [],
      // correctAnswer: '',
      // question: ''
    }
  }

  async componentDidMount() {
    console.log(this.props.category);
    console.log('we mounted')
    const category = this.props.category;
    try {
      const data = (category !== 'All Categories') ? await apiCalls.getQuestionsByCategory(category) : await apiCalls.getAllQuestions();
      console.log(data)
      let questions = data;
      console.log(questions)
      this.setState({ selectedCategory: questions, currentIndex: 1 })
      // this.loadGame();
    }
    catch (error) {
      this.setState({ error: error.message })
    }
  }

  // loadGame = () => {
  //   const [currentIndex] = this.state;
  //   const possibleAnswers = shuffle([...this.state.selectedCategory.incorrectAnswers, this.selectedCategory.correctAnswer]);
  //   this.setState(() => {
  //     return {
  //       question: this.state.selectedCategory[currentIndex].question,
  //       possibleAnswers: possibleAnswers,
  //       correctAnswer: this.state.selectedCategory.correctAnswer
  //     }
  //   })
  // }
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
      <section className='trivia-game-view'>
        <div className='trivia-game-card'>
          <GameViewContainer questions={this.state.selectedCategory}/>
        </div>
      </section>
    )
  }
}

export default TriviaGameView;