
const mongoose = require('mongoose');
const express = require('express');

// Create Express app
const app = express();
const cors = require('cors')

app.use(cors())
//TODO 1:
//1. Add logger library
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//TODO 2:
//1. Use the configurations file for the database
// Database setup
const dbName = 'surgeonsdb';
const mdbPort = 27017;
const url = `mongodb://localhost:${mdbPort}/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(url).then(() => {
    console.log('Successfully connected to the database.');
}).catch(err => {
    console.log("Couldn't connect to the database. Exiting now...");
    process.exit();
});


// Define Routes
app.get('/', (request, response) => {
    response.json({message: 'Welcome to home page'});
});

require('./routes/routes.js')(app);

// Listen for server requests
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Express server is listening on Port ${process.env.SERVER_PORT}`)
});
