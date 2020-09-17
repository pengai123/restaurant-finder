import React from 'react'

export default function Nav(props) {

	return (
		<div className="nav">
			<span className="logo">
				LOGO
		    </span>
			<span className="button" >
				See all restaurant
		    </span>
			<span className="button" >
				Sign in
		      </span>
			<span className="button" >
				Create account
		      </span>
		</div>
	)
}


//className = { this.state.view === 'feed' ? 'nav-selected' : 'nav-unselected' }