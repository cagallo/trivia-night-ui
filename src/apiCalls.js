import { handleResponse } from './utils'

export const apiCalls = {

	async getAllCategories() {
		let response = await fetch('https://trivia-night-api-2110.herokuapp.com/api/v1/questions/all')
		console.log('hitting here 1')
		handleResponse(response)
		return await response.json()
	},

	async getQuestionsByCategory(category) {
		let response = await fetch(`https://trivia-night-api-2110.herokuapp.com/api/v1/questions?category=${category}`)
		handleResponse(response)
		return await response.json()
	},

	async postNewQuestion(question) {
		const response = await fetch('https://trivia-night-api-2110.herokuapp.com/api/v1/questions', {
			method: 'POST',
			body: JSON.stringify(question),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		handleResponse(response)
		return await response.json()
	}

}