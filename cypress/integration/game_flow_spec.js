/** 
 * My function that generates the questions also shuffles the possible answers, so the 
 * placement of the correct answer changes when you run the test again(refresh). Due to this,
 * I could not thoroughly test the message that is generated after you finish the game.
 */

describe('Trivia game user flow', () => {

	it('should display current question card and allow user to submit checked answer ', () => {
		cy.intercept('https://trivia-night-api-2110.herokuapp.com/api/v1/questions/all', { fixture: 'triviaQuestions.json' })
		cy.visit('http://localhost:3000')
			.get('.category-card').contains('All Categories').click()

		//first question
		cy.get('.radio-button')
			.children()
			.first()
			.click()
			.trigger('change')
			.get('.submit-answer-button').click()

		//second question 
		cy.get('.radio-button')
			.children()
			.eq(2)
			.click()
			.trigger('change')
			.get('.submit-answer-button').click()

		//third question
		cy.get('.radio-button')
			.children()
			.eq(3)
			.click()
			.trigger('change')
			.get('.submit-answer-button').click()

	})

	it('should display final score and correct answers at end of game', () => {
		cy.intercept('https://trivia-night-api-2110.herokuapp.com/api/v1/questions/all', { fixture: 'singleQuestion.json' })
		cy.visit('http://localhost:3000')
			.get('.category-card').contains('All Categories').click()

		//first question
		cy.get('.radio-button')
			.children()
			.eq(3)
			.click()
			.trigger('change')
			.get('.submit-answer-button').click()
			.get('.correct-answers-msg').contains('The correct answers for the game are:')
			.get('.options').contains('John McEnroe')
			.get('.logo-link').click()
		cy.location().should((loc) => {
			expect(loc.href).to.eq('http://localhost:3000/')
		})
	})

	it('should allow user to return to landing page', () => {
		cy.intercept('https://trivia-night-api-2110.herokuapp.com/api/v1/questions?category=History', { fixture: 'historyQuestion.json' })
		cy.visit('http://localhost:3000')
			.get('.category-card').contains('History').click()
			.get('.logo').should('have.attr', 'alt', 'Trivia Night logo').click()
		cy.location().should((loc) => {
			expect(loc.href).to.eq('http://localhost:3000/')
		})
	})
  
})