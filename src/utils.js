export const shuffle = (incorrectAnswers, correctAnswer) => {
	const maxAnswers = 4
	const maxCorrect = 1

	// limit number of answers shuffled to number we want to display
	let possibleAnswers = incorrectAnswers.slice(0, maxAnswers - maxCorrect)
	possibleAnswers.push(correctAnswer)

	let currentIndex = possibleAnswers.length, randomIndex
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--;

		[possibleAnswers[currentIndex], possibleAnswers[randomIndex]] = [possibleAnswers[randomIndex], possibleAnswers[currentIndex]]
	}
	return possibleAnswers
}


export const handleResponse = async(response) => {
	let result = await response.json()
	if (!response.ok) {
		if (result) {
			if (result.error.detail) {
				throw new Error( `${result.error.detail}`)
			}
			throw new Error( `${result.error}`)
		}
		
		throw new Error( `${response.status} ${response.statusText}: Unable to load content.`)
	}

	return result
}