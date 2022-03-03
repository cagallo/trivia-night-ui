import React from 'react';

const TriviaContainer = () => {
  const categories = ['All Categories', 'Food and Drink', 'Geography', 'General knowledge', 'History', 'Art and Literature', 'Movies', 'Music', 'Science', 'Society and Culture', 'Sports and Leisure', 'User Generated Questions']
  const triviaCategories = categories.map((category) => {
    return (
       catergoryName = category
    )
  })
  return (
    <section className="trivia-container">
      {triviaCategories}
    </section>
  )
}


export default TriviaContainer;