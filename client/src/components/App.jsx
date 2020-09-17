import React from "react";
import Restaurants from "./Restaurants.jsx";
import Nav from "./Nav.jsx";
import axios from "axios";
import config from "../config.js";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
							location: location.city_name,
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

	changeLocation(e){
		e.preventDefault();
		if(this.state.newLocation){
			this.searchLocation(this.state.newLocation);
		}
	}



	componentDidMount() {

		this.searchLocation(this.state.location)
	}

	render() {
		return (
			<div>
				<Nav />
				<Grid container spacing={2}>
					<Grid container item
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
							placeholder="Change Location"
							style={{height: "25px",width: "200px"}} 
							onChange={this.onChange.bind(this)}
							>
							</input>
						</Grid>
						<Grid item>
							<Button size="small" variant="contained" onClick={this.changeLocation.bind(this)}>
								Confirm
        		</Button>
						</Grid>
					</Grid>
					<Grid item xs={2}>
					</Grid>
					<Grid container item xs={8}>
						<Restaurants restaurants={this.state.restaurants} />
					</Grid>
					<Grid item xs={2}>
					</Grid>
				</Grid>
			</div>
		)
	}

}

export default App;