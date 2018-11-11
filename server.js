//Node.js Dependencies
const express = require('express');

//Initialize Express app
const app = express();
const PORT = process.env.PORT || 8080;

//Express app to handle parsing data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Link HTML and API routes
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

//Start server - listener
app.listen(PORT, ()=>{
    console.log (`ON...listening on PORT: ${PORT}`)
});