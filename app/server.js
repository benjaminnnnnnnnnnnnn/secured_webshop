const express = require("express");
const path = require("path");
/*
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt')};

*/

const app = express();

// Add this line to parse JSON bodies
app.use(express.json());

const userRoute = require('./routes/User');
app.use('/user', userRoute);



app.use(express.static(path.join(__dirname, 'pages')));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

// Démarrage du serveur
app.listen(8080, () => {
    console.log('Server running on port 8080');
});

    //https.createServer(options, app).listen(8443);