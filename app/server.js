const express = require("express");
const path = require("path");
const app = express();

const fs = require("fs");
const https = require("https");

const sslOptions = {
  key: fs.readFileSync("./privkey.key"),
  cert: fs.readFileSync("./certificate.crt"),
};

// Add this line to parse JSON bodies
app.use(express.json());



// Add this line to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const userRoute = require("./routes/User");
const verifyToken = require("./auth/authMiddleware");

app.use("/user", userRoute);

app.use(express.static(path.join(__dirname, "pages")));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.get("/Sign-up", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});

const userController = require('./controllers/UserController');

app.get('/admin/users', verifyToken, userController.getUsers);

https.createServer(sslOptions, app).listen(443, () => {
  console.log("Server running on port 443");
});
