describe('Trivia game user flow', () => {
  
  it('should display single question card and allow user to click radio button and submit answer', () => {
    cy.intercept('https://trivia-night-api-2110.herokuapp.com/api/v1/questions/all', { fixture: 'triviaQuestions.json' })
    cy.visit('http://localhost:3000')
      .get('.category-card').contains('All Categories').click()

  //first question
    cy.get(".radio-button")
      .children()
      .first()
      .click()
      .trigger('change')
      .get('.submit-answer-button').click()

  //second question 
    cy.get(".radio-button")
      .children()
      .eq(2)
      .click()
      .trigger('change')
      .get('.submit-answer-button').click()

  //third question
    cy.get(".radio-button")
      .children()
      .eq(3)
      .click()
      .trigger('change')
      .get('.submit-answer-button').click()

  });

  it('should display final score and correct answers at end of game', () => {
    cy.intercept('https://trivia-night-api-2110.herokuapp.com/api/v1/questions/all', { fixture: 'singleQuestion.json' })
    cy.visit('http://localhost:3000')
      .get('.category-card').contains('All Categories').click()

    //first question
    cy.get(".radio-button")
    .children()
    .eq(2)
    .click()
    .trigger('change')
    .get('.submit-answer-button').click()
    .get('.game-over-msg').contains('Game Over. You got 0.0% correct!')
    .get('.correct-answers-msg').contains('The correct answers for the game are:')
    .get('.options').contains('John McEnroe')
  })
});