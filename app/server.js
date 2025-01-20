const express = require("express");
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt')};



const app = express();
const userRoute = require('./routes/User');
app.use('/user', userRoute);





// Démarrage du serveur
app.listen(8085, () => {
    console.log('Server running on port 8080');
});

    https.createServer(options, app).listen(8443);