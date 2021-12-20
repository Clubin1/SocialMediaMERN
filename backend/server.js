const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const users = require('./Routes/API/users');
const app = express();
// App port
const PORT = 8000;
// Middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    extended:true,
    limit: '50mb'
}));
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors middleware
app.use(cors());

// Exported connection keys
const URI = require('./Config/keys').mongoURI;
// Routes
app.use('/api/users', users);
// Database Connection
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => 
    console.log(`Server Running on Port: http://localhost:${PORT}, Database Connected.`))).catch((error) => 
    console.log(`${error} did not connect`)
);