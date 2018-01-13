

// add friend array to allow the html get request to be able to process
// the new friend array being sent from the client / browser
var FriendArray = require("../data/friends.js");


// routes ... not sure if i know what this means truly
//  routes that define what the user is getting back from API calls
//  that are processed by the server ... display data
//  like the API view link at the bottom of the friend finder pages and
//  the request for the friend comparision from the submit button results ??

// why do i need this line to make the functions work?
// including the express app modules for the get and post to work?
module.exports = function(app) {

	// Friend Array API view ... get all friends from the server??
	app.get("/api/friends", function(req, res) {

		console.log("api/friends get method called");
		res.json(FriendArray);
	});

	// when the user submits the survey form and submits data to the
	// server ... the data is packaged in an object in the form of JSON
	// ... the JSON is then pushed to the FriendArray to add a new friend
	// to the server side array
	app.post("/api/friends", function(req, res) {

		console.log("api/friends post method called");
		console.log(req.body);
		console.log(req.body.name);
		console.log(req.body.photo);
		// console.log(req.body.scores); // couldn't get scores to work ... had to make sure the ({ extended: true }) was set in the server.js file
		// console.log(req.body.scores.length);

		// calculate new user survey totals
		// var totalDiffCurrent = 0; // current calc for difference
		var totalDiffMatch;  // current match calc for friend
		var closestFriendMatch;  // index of friend array for closest match

		// loop through each friend in the array currently to check 
		// which friend survey results are closest to the new user

		// loop through the friends array
		for (var i = 0; i < FriendArray.length; i++) {

			var totalDiffCurrent = 0; // current calc for difference
		
			console.log("looping thru friends array at index " + i);

			// loop through the survey answers array
			// for (var j = 0; j < req.body.scores.length; j++) {
			for (var j = 0; j < FriendArray[i].scores.length; j++) {

				console.log("looping thru survey answers array at index " + j);

				// grab friends array at index current answer
				var answerFriend = parseInt(FriendArray[i].scores[j]);
				var answerNewUser = parseInt(req.body.scores[j]);

				// console.log("answerFriend = " + answerFriend);
				// console.log("answerNewUser = " + answerNewUser);

				var calcDifference = Math.abs(answerFriend - answerNewUser);
				// console.log("calcDifference = " + calcDifference);

				totalDiffCurrent += calcDifference;

				// newUserCalc += req.body.scores[j];

			}

			console.log("current match diff = " + totalDiffMatch);
			console.log("current diff = " + totalDiffCurrent);

			if (totalDiffMatch === undefined || totalDiffCurrent < totalDiffMatch) {

				console.log("inside if statement to change totalDiffMatch & update closestFriendMatch");
				totalDiffMatch = totalDiffCurrent;
				closestFriendMatch = i;
			} 

		}

		console.log("returning json results to the post call");
		console.log("match friend name = " + FriendArray[closestFriendMatch].name);
		console.log("match friend pic link = " + FriendArray[closestFriendMatch].photo);

		// send results back to the post call in the html data
		res.json(
			{
				name: FriendArray[closestFriendMatch].name,
				picLink: FriendArray[closestFriendMatch].photo
			}
		);

		// add new user to the friend Array (should be done last)
		FriendArray.push(req.body);
	});

	// app.get("/results", function(req, res) {

	// 	// calculate new user survey values

	// 	// loop through each friend item in array and 
	// });

};
