import React from "react";
import Restaurants from "./Restaurants.jsx";
import Nav from "./Nav.jsx";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Location from "./Location.jsx"


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
		axios.get(`/restaurants/${loc}?start=${this.state.startingIdx}`)
			.then(result => {
				this.setState({
					location: result.data.location.title,
					restaurants: result.data.restaurants
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
			<div style={{ backgroundColor: `#C98686`, backgroundImage: `url(${"https://image.freepik.com/free-photo/empty-wooden-table-top-with-blurred-coffee-shop_7188-1337.jpg"})` }}>
				<Nav />
				<Location changeLocation={this.changeLocation.bind(this)} location={this.state.location} />
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
					spacing={2}>
					<Grid container item sm={9} xs={12}>
						<Restaurants restaurants={this.state.restaurants} />
					</Grid>
				</Grid>
			</div>
		)
	}

}

export default App;