

// Need the path package to be able to find the correct path to the html files
var path = require("path");

// Routes needed

// not sure why this code is needed again ...
// might be for this file to be able to use the express app functions
module.exports = function(app) {

	// html get requests
	// handles when a user requests to visit a page with the corresponding
	// url

	app.get("/", function(req, res) {

		// response from the server sends the home.html page to the users
		// browser for the url request
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	app.get("/survey", function(req, res) {

		// response from the server send the survey.html page to the user's
		// broswer for the url request
		res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	// app.get("/results", function(req, res) {

	// 	// response from the server sends the results.html page to the 
	// 	// user's browswer for the most compatible friend results to be
	// 	// displayed (used this since I could not get modals to work)
	// 	res.sendFile(path.join(__dirname, "../public/results.html"));
	// });

}; // end of the module.exports function definition ??