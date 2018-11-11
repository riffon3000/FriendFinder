const friends = require('./app/data/friends.json');

module.exports = function(app){
    // Displays all friends
    app.get('./api/data/friends', (req, res)=> {
        return res.json(friends);
    });
    
    // Create New friends - takes in JSON input
    app.post('/api/data/friends', (req, res)=> {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
       const newFriend = req.body;

        console.log(newFriend);
    
        friends.push(newFriend);
    
        res.json(newFriend);
    });
};