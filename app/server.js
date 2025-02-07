const express = require("express");
const path = require("path");
const app = express();

// Add this line to parse JSON bodies
app.use(express.json());

// Add this line to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
/*
const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "db",
	port: 6033,
});

// Connect to the database
connection.connect((err) => {
	if (err) throw err;
	console.log("Connected to MySQL Database!");

	// Example query
	connection.query("SELECT * FROM users", (err, results, fields) => {
		if (err) throw err;
		console.log(results);
	});

	// connection.release();
});

*/
const userRoute = require("./routes/User");

app.use("/user", userRoute);

app.use(express.static(path.join(__dirname, "pages")));

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.get("/Sign-up", (req, res) => {
	res.sendFile(path.join(__dirname, "pages", "signup.html"));
});



// Start the server
app.listen(8085, () => {
	console.log("Server running on port 8085");
});
