import React from 'react'
import '../styles/ErrorPage.css'
import PropTypes from 'prop-types'

const ErrorPage = (props) => {
	let error
	if (props.message) {
		error = props.message.toString()
		error = error.substring(error.indexOf('Error: ') + 7)
	}
	return (
		<div className="error-page">
			<h2 className="error">Sorry, there has been an error: </h2>
			<p className="message">{error}</p>
		</div>
	)
}

export default ErrorPage

ErrorPage.propTypes = {
	message: PropTypes.object
}