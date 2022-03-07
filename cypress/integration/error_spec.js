
describe('Trivia Night error page user flow', () => {

	it('should display error when visiting a bad link', () => {
		cy.intercept('GET', 'https://trivia-night-api-2110.herokuapp.com/api/v1/questions?category=4823483290434903', {statusCode: 404})
		cy.visit('http://localhost:3000/4823483290434903')
			.get('.error').contains('Sorry, there has been an error: ')
			.get('.message').contains('404 Not Found: Unable to load content.')
			.get('.logo-link').click()
		cy.location().should((loc) => {
			expect(loc.href).to.eq('http://localhost:3000/')
		})
	})
  
	it('should show error when loading page is unavailable', () => {
		cy.intercept('GET', 'https://trivia-night-api-2110.herokuapp.com/api/v1/questions?category=History', {statusCode: 500})
		cy.visit('http://localhost:3000/History')
			.get('.error').contains('Sorry, there has been an error: ')
			.get('.message').contains('500 Internal Server Error: Unable to load content')
	})

	it('should display error when user tries to submit duplicate question', () => {
		cy.intercept('POST', 'https://trivia-night-api-2110.herokuapp.com/api/v1/questions',  
			{
				statusCode: 201,
				body: {
					'question': 'What year did the French Revolution begin?',
					'incorrect_answers': ['1820', '1861', '1799'],
					'correct_answer': 1789,
				}
			})
		cy.visit('http://localhost:3000/form')
			.get('input[name="question"]').type('What year did the French Revolution begin?').should('have.value', 'What year did the French Revolution begin?')
			.get('input[name="incorrect_answer_1"]').type('1820').should('have.value', '1820')
			.get('input[name="incorrect_answer_2"]').type('1861').should('have.value', '1861')
			.get('input[name="incorrect_answer_3"]').type('1799').should('have.value', '1799')
			.get('input[name="correct_answer"]').type('1789').should('have.value', '1789')
			.get('.new-question-button').click()
			.get('.message').contains('Your question: "What year did the French Revolution begin?" was created successfully!')

		cy.intercept('POST', 'https://trivia-night-api-2110.herokuapp.com/api/v1/questions',  
			{
				statusCode: 500,
				body: {
					'question': 'What year did the French Revolution begin?',
					'incorrect_answers': ['1820', '1861', '1799'],
					'correct_answer': 1789,
				}
			})
		cy.visit('http://localhost:3000/form')
			.get('input[name="question"]').type('What year did the French Revolution begin?').should('have.value', 'What year did the French Revolution begin?')
			.get('input[name="incorrect_answer_1"]').type('1820').should('have.value', '1820')
			.get('input[name="incorrect_answer_2"]').type('1861').should('have.value', '1861')
			.get('input[name="incorrect_answer_3"]').type('1799').should('have.value', '1799')
			.get('input[name="correct_answer"]').type('1789').should('have.value', '1789')
			.get('.new-question-button').click()
			.get('.error').contains('Sorry, there has been an error: ')
			.get('.message').contains('500 Internal Server Error: Unable to load content')
	})

	it('should display an error if an incomplete form is submitted', () => {
    
		cy.intercept('POST', 'https://trivia-night-api-2110.herokuapp.com/api/v1/questions',  
			{
				statusCode: 422,
				body: {
					'question': 'Which founding father is responsible for founding the New York Post?',
					'incorrect_answers': ['Benjamin Franklin', 'John Adams', 'Thomas Jefferson'],
					'correct_answer': '',
				}
			})
		cy.visit('http://localhost:3000/form')
			.get('input[name="question"]').type('Which founding father is responsible for founding the New York Post?').should('have.value', 'Which founding father is responsible for founding the New York Post?')
			.get('input[name="incorrect_answer_1"]').type('Benjamin Franklin').should('have.value', 'Benjamin Franklin')
			.get('input[name="incorrect_answer_2"]').type('John Adams').should('have.value', 'John Adams')
			.get('input[name="incorrect_answer_3"]').type('Thomas Jefferson').should('have.value', 'Thomas Jefferson')
			.get('.new-question-button').click()
			.get('.error').contains('Sorry, there has been an error: ')
			.get('.message').contains('422 Unprocessable Entity: Unable to load content')
	})
  
})