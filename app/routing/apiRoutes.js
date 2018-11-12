const friends = require('../data/friends.js');

module.exports = function (app) {
    // Displays all friends
    app.get('/api/friends', (req, res) => {
        res.json(friends);
    });

    // A POST routes /api/friends will handle incoming survey results
    app.post('/api/friends', (req, res) => {

        // Parse new friend input to get integers (AJAX post seemed to make the numbers strings)
        let newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };

        let scoresArray = [];
        for (let i = 0; i < req.body.scores.length; i++) {
            scoresArray.push(parseInt(req.body.scores[i]))
        }
        newFriend.scores = scoresArray;

        // check the new friend entry with the existing ones
        let comparisonArray = [];
        for (let i = 0; i < friends.length; i++) {

            // Check each friend's scores and sum difference in points
            let currentComparison = 0;
            for (let j = 0; j < newFriend.scores.length; j++) {
                currentComparison += Math.abs(newFriend.scores[j] - friends[i].scores[j]);
            }

            // Push each comparison between friends to array
            comparisonArray.push(currentComparison);
        }

        // Determine the best match using the postion of best match in the friends array
        let bestMatch = 0; // assume its the first person to start
        for (let i = 1; i < comparisonArray.length; i++) {

            // Lower number in comparison difference means better match
            if (comparisonArray[i] <= comparisonArray[bestMatch]) {
                bestMatch = i;
            }
        }
        let friendMatch = friends[bestMatch];

        // Reply with a JSON object of the best match
        res.json(friendMatch);

        // Push the new friend to the friends data array for storage
        friends.push(newFriend)
    });
};