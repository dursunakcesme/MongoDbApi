const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({ path: __dirname + '/.env' });

// create express application
const app = express();

// parse application form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//Database configuration
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Connecting Database
mongoose.connect(process.env.Mongo_DB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connected Database");
}).catch(err => {
    console.log('Database connecting failure...', err);
    process.exit();
});

//Intro Route
app.get('/', (req, res) => {
    res.json({ "message": "Api is running..." });
});

//Map Routes
require('./backend/routes/record.routes.js')(app);

//Listen requests
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running...`);
});
