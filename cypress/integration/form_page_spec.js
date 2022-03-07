describe('Trivia Night form page user flow', () => {
  

	it('should update input values as form is filled out', () => {
		cy.visit('http://localhost:3000/form')
			.get('input[name="question"]').type('What year did the French Revolution begin?').should('have.value', 'What year did the French Revolution begin?')
			.get('input[name="incorrect_answer_1"]').type('1820').should('have.value', '1820')
			.get('input[name="incorrect_answer_2"]').type('1861').should('have.value', '1861')
			.get('input[name="incorrect_answer_3"]').type('1799').should('have.value', '1799')
			.get('input[name="correct_answer"]').type('1789').should('have.value', '1789')
	})
  
	it('should successfully post question based on user input', () => {
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
	})

	it('should allow user to return to landing page', () => {
		cy.visit('http://localhost:3000/form')
			.get('.logo').should('have.attr', 'alt', 'Trivia Night logo').click()
		cy.location().should((loc) => {
			expect(loc.href).to.eq('http://localhost:3000/')
		})
	})
  
})