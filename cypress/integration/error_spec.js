
describe('Trivia Night error page user flow', () => {

	it('should display 404 page when visiting a bad link', () => {
		cy.visit('http://localhost:3000/4823483290434903')
			.get('.error').contains('Sorry, there has been an error: ')
			.get('.message').contains('404 Not Found: Unable to load content')
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

})