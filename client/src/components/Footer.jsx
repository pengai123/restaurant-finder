import React, { useState } from 'react'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import Modal from 'react-modal';
import { Grid } from '@material-ui/core';

export default function Footer() {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModalClose = () => {
		setIsModalOpen(false);
	}

	const handleClick = (e) => {
		e.preventDefault();
		setIsModalOpen(true);
	}

	const aboutContent = (
		<div className="abt-container">
			<div className="abt-hdr-container">
				<p className="abt-hdr">About</p>
			</div>
			<div className="abt-front">
				<p className="tech-hdr">Front End</p>
				<p className="tech-item">React.js</p>
				<p className="tech-item">CSS</p>
				<p className="tech-item">Material-UI</p>
				
				<p className="tech-item">JavaScript XML (JSX)</p>
				<p className="tech-item">HTML</p>
			</div>
			<div className="abt-back">
				<p className="tech-hdr">Back End</p>
				<p className="tech-item">JavaScript</p>
				<p className="tech-item">Node.js</p>
				<p className="tech-item">Express</p>
				<p className="tech-item">MongoDB Atlas</p>
				<p className="tech-item">Rest API</p>
			</div>
			<div className="abt-other">
				<p className="tech-hdr">Other Techs</p>
				<p className="tech-item">Git</p>
				<p className="tech-item">NPM</p>
				<p className="tech-item">Webpack</p>
				<p className="tech-item">Babel</p>
				<p className="tech-item">Heroku</p>
				<p className="tech-item">Agile Development</p>
			</div>
		</div>
	);
	return (
		<div className="footer-container">
			<RestaurantMenuIcon fontSize="large" className="logo" />
			<p className="footer-project">Personal Project: Restaurant Finder</p>
			<p className="footer-copyright">Copyright @ 2020 All Right Reserved</p>
			<p className="footer-text" onClick={handleClick}>About</p>
			<Modal
				ariaHideApp={false}
				isOpen={isModalOpen}
				onRequestClose={handleModalClose}
				style={{
					overlay: {
						background: "transparent"
					},
					content: {
						// background: "#FFF4EC",
						// background: "#0f4c5c",
						background: "#d6e2e9",
						borderColor: "transparent",
						top: '25%',
						left: '30%',
						right: '30%',
						bottom: '25%',
						display: "grid"
					}
				}}
			>
				{aboutContent}
			</Modal>
		</div>
	)
}
