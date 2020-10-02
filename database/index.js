const mongoose = require("mongoose");
//const mongodbAtlasUrl = require("./mongodbAtlasUrl.js")

// Heroku config var:  process.env.mongodbAtlasUrl 

mongoose.connect(process.env.mongodbAtlasUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const Account = mongoose.model("accounts", {
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})


module.exports = {
	Account
}