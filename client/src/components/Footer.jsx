import React from 'react'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

export default function Footer() {
	return (
		<div className="footer-container">
			<RestaurantMenuIcon fontSize="large" className="logo"/>
			<p className="footer-project">Personal Project: Restaurant Finder</p>
			<p className="footer-copyright">Copyright @ 2020 All Right Reserved</p>
			<p className="footer-text">About</p>
		</div>
	)
}
