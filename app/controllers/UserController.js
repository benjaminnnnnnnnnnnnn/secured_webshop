const path = require('path');
const bcrypt = require('bcrypt');
const connection = require('../db');

const saltRounds = 10;

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, '../pages/user.html'));
    },

    post: (req, res) => {
        connection.query(`SELECT username, password, isAdmin FROM Users WHERE username = ?`, [req.body.username], (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                    if (err) throw err;

                    if (result) {
                        res.json({ isAdmin: results[0].isAdmin === 1, username: results[0].username });
                    } else {
                        res.status(401).json({ error: 'Invalid username or password' });
                    }
                });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        });
    },

    register: (req, res) => {
        connection.query(`SELECT COUNT(*) FROM Users WHERE username = ?`, [req.body.username], (err, results) => {
            if (err) throw err;
            if (results[0]['COUNT(*)'] > 0) {
                res.status(401).json({ error: 'Username already exists' });
                return;
            }

            connection.query(`SELECT MAX(id) FROM Users`, (err, results) => {
                if (err) throw err;
                const newid = (results[0]['MAX(id)'] + 1);

                const { username, password } = req.body; 
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) throw err;

                    connection.query(`INSERT INTO Users (id, username, password, isAdmin) VALUES (?, ?, ?, 0)`, [newid, username, hash], (err) => {
                        if (err) throw err;
                        res.sendFile(path.join(__dirname, '../pages/user.html'));
                    });
                });
            });
        });
    },

    getUsers: (req, res) => {
        const searchQuery = req.query.search ? `%${req.query.search}%` : '%';
        connection.query(`SELECT id,username,password,isAdmin FROM Users WHERE username LIKE ?`, [searchQuery], (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    }
};
