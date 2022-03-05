import React, { Component } from 'react';
import { apiCalls } from '../apiCalls';
import GameViewContainer from './GameViewContainer';
import { shuffle } from '../utils';

class TriviaGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let category = this.props.category;
    if (category === 'User Generated Questions') {
       category = 'User Generated Question';
    }
    try {
      let data = (category !== 'All Categories') ? await apiCalls.getQuestionsByCategory(category) : await apiCalls.getAllCategories();
      let questions = data;

      //remove
      questions = questions.splice(5, 3)

      console.log('setting state')
      console.log(this.state.selectedCategory)
      console.log("about to call startGame")
      this.setState({ selectedCategory: questions })
      this.startGame();
    }
    catch (error) {
      this.setState({ error: error.message })
    }
  }

  startGame = () => {
    console.log("starting game...")
    const {currentIndex} = this.state;
    console.log(this.state)
    const question = this.state.selectedCategory[currentIndex];
    console.log('question: ',JSON.stringify(question))
    const possibleAnswers = shuffle([...question.incorrect_answers, question.correct_answer]);
    this.setState(() => {
      return {
        question: question.question,
        possibleAnswers: possibleAnswers,
        correctAnswer: question.correct_answer
      }
    })
  }

  handleNextQuestion = () => {
    console.log('handleq')
    //console.log(correctAnswer)
    let correctAnswer = 'est'
    const {userAnswer, score} = this.state
    this.setState({ currentIndex: this.state.currentIndex + 1 })
    if (userAnswer === correctAnswer) { 
      this.setState ({
        score: score + 1
     })
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log('componentDidUpdate')
    this.state.shuffledAnswers=[]
    console.log(prevState.currentIndex)
    const{currentIndex} = this.state;
    console.log(currentIndex)
    if (this.state.currentIndex !== prevState.currentIndex 
      && !(currentIndex === this.state.selectedCategory.length)) {
      console.log(this.state.selectedCategory)
      this.setState(() => {
        return {
          disabled: true,
          question: this.state.selectedCategory[currentIndex].question,
          possibleAnswers: this.state.selectedCategory[currentIndex].possibleAnswers,
          correctAnswer: this.state.selectedCategory[currentIndex].correctAnswer          
        }
      });
    }
  }

  checkAnswer = (answer, shuffledAnswers) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
      shuffledAnswers: shuffledAnswers
    })
  }

  finishGame =() => {
    if (this.state.currentIndex === this.state.selectedCategory.length - 1) {
      this.setState({
        gameOver: true
      })
    }
  }

  render() {
    const currentIndex = this.state.currentIndex;
    console.log(currentIndex)
    // console.log(this.state)
    // console.log(currentIndex)
    // console.log(this.state.selectedCategory[this.state.currentIndex])
    if (currentIndex === this.state.selectedCategory.length) {
      return (
        <div>
          <h1>Game Over. You got {(this.state.score / this.state.selectedCategory.length) * 100}% correct!.</h1>
          <h1>The correct answers for the quiz are:</h1>
          <ul>
            {this.state.selectedCategory.map((question, index) => (
              <h1 className='options'
                key={index}>
                  {question.correct_answer}
              </h1>
            ))}
          </ul>
        </div>
      )
    } 
    return (
      <section className='trivia-game-view'>
        <div className='trivia-game-card'>
          <GameViewContainer score={this.state.score} disabled={this.state.disabled} total={this.state.selectedCategory.length} finishGame={this.finishGame} checkAnswer={this.checkAnswer} handleNextQuestion={this.handleNextQuestion} questions={this.state.selectedCategory} shuffledAnswers={this.state.shuffledAnswers} index={currentIndex}/>
        </div>
      </section>
    )
  }
}

export default TriviaGameView;