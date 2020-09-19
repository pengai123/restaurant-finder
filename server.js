const express = require("express");
const app = express();
const bp = require("body-parser")
const port = process.env.PORT || 3000;
const axios = require("axios");
//const config = require("./config.js")

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static("./client/dist"));

console.log('user_key in server:', process.env.user_key)

app.get("/restaurants", (req, res) => {
	
		res.send("hello from server");
})


app.listen(port, function () {
	console.log(`Listening on port ${port}`)
})