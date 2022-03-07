import React from 'react'
import CategoryCard from './CategoryCard'
import '../styles/TriviaContainer.css'
import { Link } from 'react-router-dom'

const TriviaContainer = () => {
	const categories = ['All Categories', 'Food and Drink', 'Geography', 'General Knowledge', 'History', 'Art and Literature', 'Film and TV', 'Music', 'Science', 'Society and Culture', 'Sport and Leisure', 'User Generated Questions']
	let i = 0
	const triviaCategories = categories.map((category) => {
		return <Link key={i++} to={`/${category}`}>
			<CategoryCard
				categoryName ={category}
				key ={i++}
			/>
		</Link>
	})

	return (
		<section className="trivia-container">
			<div className='trivia-category-cards'>
				{triviaCategories}
			</div>
		</section>
	)
}

export default TriviaContainer