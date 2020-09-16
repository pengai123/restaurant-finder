import React from "react";
import Restaurants from "./Restaurants.jsx"
import axios from "axios";
import config from "../config.js";


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			location: "Phoenix",
			restaurants: []
		}
	}

	searchLocation(loc) {
		axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${loc}`, config)
			.then(result => {
				let location = result.data.location_suggestions[0];
				console.log('location:', location)
				axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${location.entity_id}&entity_type=${location.entity_type}`, config)
					.then(result => {
						console.log('result.data:', result.data.restaurants)
						this.setState({
							restaurants: result.data.restaurants
						})
					})
			})
	}

	componentDidMount() {

		this.searchLocation(this.state.location)
	}

	render() {
		return (
			<div>
				<h3>Restaurants In {this.state.location}</h3>
				<Restaurants restaurants={this.state.restaurants} />
			</div>
		)
		// return (
		// 	<div>
		// 		<div className="nav">
		// 			<span className="logo" onClick={() => this.changeView('feed')}>
		// 				RESTAURANTS
    //       </span>
		// 			<span className={this.state.view === 'feed'
		// 				? 'nav-selected'
		// 				: 'nav-unselected'}
		// 				onClick={() => this.changeView('feed')}
		// 			>
		// 				See all restaurant
    //       </span>
		// 			<span className="nav-unselected" onClick={() => this.changeView('signin')}>
		// 				Sign in
    //       </span>
		// 			<span className="nav-unselected" onClick={() => this.changeView('createAccount')}>
		// 				Create account
    //       </span>
		// 		</div>
		// 		<div className="main">
		// 			{this.renderView()}
		// 		</div>
		// 	</div>
		// )
	}

}

export default App;