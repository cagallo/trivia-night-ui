export const apiCalls = {

  async getAllCategories() {
    let response = await fetch('https://trivia-night-api-2110.herokuapp.com/api/v1/questions/all')
    return await response.json();
  },

  async getQuestionsByCategory(category) {
    let response = await fetch(`https://trivia-night-api-2110.herokuapp.com/api/v1/questions?category=${category}`)
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
    return await response.json()
  }

}