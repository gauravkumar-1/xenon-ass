const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/car_marketplace', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a simple Car model
const Car = mongoose.model('Car', { brand: String, model: String, year: Number });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    // Retrieve and send cars from the database
    Car.find((err, cars) => {
        if (err) throw err;
        res.sendFile(__dirname + '/public/index.html');
    });
});

// Other routes for login, contact, etc.

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
