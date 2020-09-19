import React from "react";
import Restaurants from "./Restaurants.jsx";
import Nav from "./Nav.jsx";
import axios from "axios";
//import config from "../config.jsx";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Location from "./Location.jsx"
const aws = require('aws-sdk');


const zomatoConfig = {
	headers: {
		"user-key": process.env["user-key"]
	}
};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			location: "",
			restaurants: [],
			startingIdx: 0   // api can get data for a maximum of 20 restaurant each time
		}
	}

	searchLocation(loc) {
		axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${loc}`, zomatoConfig)
			.then(result => {
				let location = result.data.location_suggestions[0];
				console.log('location:', location)
				axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${location.entity_id}&entity_type=${location.entity_type}&start=${this.state.startingIdx}`, zomatoConfig)
					.then(result => {
						console.log('result.data:', result.data.restaurants)
						this.setState({
							location: location.title,
							restaurants: result.data.restaurants
						})
					})
			})
	}

	changeLocation(loc) {
		this.searchLocation(loc);
	}

	componentDidMount() {
		this.searchLocation("phoenix")
	}

	render() {
		return (
			<div>
				<Nav />
				<Location changeLocation={this.changeLocation.bind(this)} location={this.state.location} />
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={2}>
					<Grid container item sm={8} xs={12}>
						<Restaurants restaurants={this.state.restaurants} />
					</Grid>
				</Grid>
			</div>
		)
	}

}

export default App;