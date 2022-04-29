// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const https_options = {
    ca: fs.readFileSync("ca_bundle.crt"),
    key: fs.readFileSync("private.key"),
    cert: fs.readFileSync("certificate.crt")
};

const port = 8443;

// create an instance of express to serve our end points
const app = express();


// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);


https.createServer(https_options, app).listen(port, function(){
    console.log("Express server listening on port " + port);
});