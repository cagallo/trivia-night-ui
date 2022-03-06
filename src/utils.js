export const shuffle = (array) => {
	let currentIndex = array.length, randomIndex

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
	}

	return array
  
}


export const handleResponse = (response) => {
	if (!response.ok) {
		throw new Error( `${response.status} ${response.statusText}: Unable to load content.`)
	}
}