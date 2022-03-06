import React from 'react'
import '../styles/ErrorPage.css'

const ErrorPage = (props) => {
	return (
		<div className="error-page">
			<h2 className="error">Sorry, there has been an error: </h2>
			<p className="message">{props.message}</p>
		</div>
	)
}

export default ErrorPage