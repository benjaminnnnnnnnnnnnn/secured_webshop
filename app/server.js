const express = require("express");
const path = require("path");
const db = require("./controllers/db_confing"); // Import the database configuration

const app = express();

// Add this line to parse JSON bodies
app.use(express.json());

const userRoute = require('./routes/User');

app.use('/user', userRoute);

app.use(express.static(path.join(__dirname, 'pages')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

app.get('/Sign-up', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'signup.html'));
});


// Ensure the database connection is established before starting the server
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if the database connection fails
  } else {
    console.log('Connected to the database');

    // Start the server
    app.listen(8080, () => {
      console.log('Server running on port 8080');
    });

    // Release the connection back to the pool
    connection.release();
  }
});