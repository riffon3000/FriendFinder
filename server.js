//Node.js Dependencies
const express = require('express');

//Initialize Express.js
const app = express();
const PORT = process.env.PORT || 8080;

//Express.js to handle parsing data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Link HTML and API routes
const apiRoutes = require('./app/routing/apiRoutes');
const htmlRoutes = require('./app/routing/htmlRoutes');

//Server routing
apiRoutes(app);
htmlRoutes(app);

//Start server - listener
app.listen(PORT, ()=>{
    console.log (`ON...listening on PORT: ${PORT}`)
});