import React from 'react';
import '../styles/App.css';
import TriviaContainer from './TriviaContainer';
import Nav from './Nav';
import TriviaGameView from './TriviaGameView';
import { Route } from 'react-router-dom';


const App = () => {
  return (
    <section className='app'>
      <Nav />
      <Route path="/:category" render={({ match }) => {
        console.log(match)
        return <TriviaGameView category={match.params.category} />;
      }} />
      <Route exact path="/">
        <TriviaContainer />
      </Route>
    </section>
  )
}

export default App;