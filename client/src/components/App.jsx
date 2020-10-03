import React from "react";
import Restaurants from "./Restaurants.jsx";
import Navbar from "./Navbar.jsx";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Location from "./Location.jsx"
import Page from "./Page.jsx"

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			location: "",
			restaurants: [],
			startingIdx: 0,   // api can get data for a maximum of 20 restaurant each time
			keyWord: ""
		}
	}

	searchKeyword(kw) {
		axios.get(`/restaurants/${this.state.location}?start=${this.state.startingIdx}&keyWord=${kw}`)
			.then(result => {
				console.log("result.data.location: ", result.data.location)
				this.setState({
					keyWord: kw,
					restaurants: result.data.restaurants,
					startingIdx: 0
				})
			})
	}

	searchLocation(loc) {
		axios.get(`/restaurants/${loc}?start=${this.state.startingIdx}&keyWord=`)
			.then(result => {
				console.log("result.data.location: ", result.data.location)
				console.log("result.data.restaurants: ", result.data.restaurants)
				this.setState({
					location: result.data.location.title,
					restaurants: result.data.restaurants,
					startingIdx: 0
				})
			})
	}

	changePage(startIdx) {
		console.log('this:', this)
		console.log('startIdx:', startIdx)
		axios.get(`/restaurants/${this.state.location}?start=${startIdx}&keyWord=${this.state.keyWord}`)
			.then(result => {
				console.log("result.data.startingIdx: ", result.data.startingIdx)
				console.log("result.data.restaurants: ", result.data.restaurants)
				this.setState({
					restaurants: result.data.restaurants,
					startingIdx: startIdx
				})
			})
	}

	changeLocation(loc) {
		this.searchLocation(loc);
	}

	changeKeyword(kw) {
		this.searchKeyword(kw);
	}


	// pn stands for prev or next
	pageClick(pn) {
		console.log('pn:', pn)
		if(pn === -1 && this.state.startingIdx > 0) { // prev page clicked
			console.log("prev page clicked")
			let newStart = this.state.startingIdx - 20;
			console.log('newStart:', newStart)
			this.changePage(newStart)
		}

		if(pn === 1) { // next page clicked
			console.log("next page clicked")
			let newStart = this.state.startingIdx + 20;
			console.log('newStart:', newStart)
			this.changePage(newStart)
		}
	}

	componentDidMount() {
		this.searchLocation("las vegas")
	}

	render() {
		return (
			// style={{ backgroundColor: `#C98686`, backgroundImage: `url(${"https://image.freepik.com/free-photo/empty-wooden-table-top-with-blurred-coffee-shop_7188-1337.jpg"})` }}
			<div className="root" >
				<Navbar changeKeyword={this.changeKeyword.bind(this)} />
				<Location changeLocation={this.changeLocation.bind(this)} location={this.state.location} />
				<Page pageClick={this.pageClick.bind(this)} />
				<Restaurants restaurants={this.state.restaurants} />
			</div>
		)
	}

}

export default App;