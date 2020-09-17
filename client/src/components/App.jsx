import React from "react";
import Restaurants from "./Restaurants.jsx";
import Nav from "./Nav.jsx";
import axios from "axios";
//import config from "../config.js";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Location from "./Location.jsx" 

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			location: "",
			restaurants: []
		}
	}

	searchLocation(loc) {
		axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${loc}`, {
			headers: {
				"user-key": "1675e2cc12fe12dee2e8839c2ead3234"
			}
		})
			.then(result => {
				let location = result.data.location_suggestions[0];
				console.log('location:', location)
				axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${location.entity_id}&entity_type=${location.entity_type}`, {
					headers: {
						"user-key": "1675e2cc12fe12dee2e8839c2ead3234"
					}
				})
					.then(result => {
						console.log('result.data:', result.data.restaurants)
						this.setState({
							location: location.title,
							restaurants: result.data.restaurants
						})
					})
			})
	}


	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	changeLocation(e) {
		e.preventDefault();
		if (this.state.newLocation) {
			this.searchLocation(this.state.newLocation);
		}
	}



	componentDidMount() {

		this.searchLocation("phoenix")
	}

	render() {
		return (
			<div>
				<Nav />
				{/* <Location location={this.state.location}/> */}
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={2}
				>
					<Grid container item
						direction="row"
						justify="center"
						alignItems="center"
					>
						<LocationOnOutlinedIcon />
						<Typography variant="subtitle1" >
							{this.state.location}
						</Typography>
					</Grid>
					<Grid item>
						<input name="newLocation"
							placeholder="Enter city name.."
							style={{ height: "25px", width: "200px" }}
							onChange={this.onChange.bind(this)}
						>
						</input>
					</Grid>
					<Grid item>
						<Button size="small" variant="contained"
							style={{ fontWeight: "bold" }}
							onClick={this.changeLocation.bind(this)}
						>
							GO!
        		</Button>
					</Grid>
				</Grid>
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={2}>
					<Grid container item xs={8}>
						<Restaurants restaurants={this.state.restaurants} />
					</Grid>
				</Grid>
			</div>
		)
	}

}

export default App;