const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://mongodb:mongodb@atlascluster1.1pbvo.mongodb.net/restaurant-finder?retryWrites=true&w=majority', {
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