import React from 'react';
import CategoryCard from './CategoryCard'

const TriviaContainer = () => {
  const categories = ['All Categories', 'Food and Drink', 'Geography', 'General knowledge', 'History', 'Art and Literature', 'Movies', 'Music', 'Science', 'Society and Culture', 'Sports and Leisure', 'User Generated Questions']
  let i = 0;
  const triviaCategories = categories.map((category) => {
    return (
      <CategoryCard
       catergoryName ={category}
       key ={i}
       />
    )
  })
  return (
    <section className="trivia-container">
      {triviaCategories}
    </section>
  )
}


export default TriviaContainer;