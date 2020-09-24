const db = require("./index.js");

let newAccount = function (userObj, cb = () => { }) {
	db.Account.create(userObj)
		.then(result => {
			console.log('new user result:', result)
			cb(result);
		})
}

let findAccount = function (username, cb = () => { }) {
	db.Account.findOne({ username: username })
		.then(result => {
			cb(result);
		})
}

let clearAccount = function (cb = () => { }) {
	db.Account.deleteMany()
		.then(result  => {
			console.log("Account table cleared!")
			cb(result);
		})
}

module.exports = {
	newAccount,
	clearAccount,
	findAccount
}