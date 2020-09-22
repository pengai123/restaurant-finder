const express = require("express");
const app = express();
const bp = require("body-parser")
const port = process.env.PORT || 3000;
const axios = require("axios");
//const config = require("./config.js")

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static("./client/dist"));

const zomatoConfig = {
	headers: {
		//"user-key": config.user_key
		"user-key": process.env.user_key
	}
};

app.get("/restaurants/:loc", (req, res) => {

	let loc = req.params.loc;
	let start = req.query.start;
	let keyWord = req.query.keyWord;
	// console.log('loc:', loc)
	// console.log('start:', start)
	//console.log('keyWord:', keyWord)
	axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${loc}`, zomatoConfig)
		.then(result => {
			let location = result.data.location_suggestions[0];
			axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${location.entity_id}&entity_type=${location.entity_type}&start=${start}&q=${keyWord}`, zomatoConfig)
				.then(result => {
					console.log('result.data:', result.data)
					let restaurants = result.data.restaurants;
					//console.log('result.data:', result.data.restaurants)
					res.send({location: location, restaurants: restaurants});
				})
		})
	
})


app.listen(port, function () {
	console.log(`Listening on port ${port}`)
})