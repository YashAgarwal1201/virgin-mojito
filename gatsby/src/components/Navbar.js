import { Link } from 'gatsby'
import React from 'react'

export default function Navbar() {
	return (
		<div>
			<h1>Yash Agarwal</h1>
			<div className="links">
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/projects">Projects</Link>
			</div>
		</div>
	)
}