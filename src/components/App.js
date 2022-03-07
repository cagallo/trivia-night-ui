import React from 'react'
import '../styles/App.css'
import TriviaContainer from './TriviaContainer'
import Nav from './Nav'
import TriviaGameView from './TriviaGameView'
import Form from './Form'
import { Route, Switch } from 'react-router-dom'
import ErrorPage from './ErrorPage'

const App = () => {
	return (
		<section className='App'>
			<Switch>
				<Route exact path="/">
					<Nav location="home"/>
					<TriviaContainer />
				</Route>
				<Route exact path='/form' render={({ match }) => {
					return [<Nav location="form" key={match + '-nav'}/>, <Form key={match + '-trivia-form'}/>]
				}} />
				<Route exact path="/:category" render={({ match }) => {
					return [<Nav location="game" key={match + '-nav'}/>, <TriviaGameView category={match.params.category}  key={match + '-trivia-category'}/>]
				}} />
				<Route>
					<Nav />
					<ErrorPage />
				</Route>
			</Switch>
		</section>
	)
}

export default App