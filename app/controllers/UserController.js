const path = require('path');
const bcrypt = require('bcrypt');
const connection = require('../db');

const saltRounds = 10;

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, '../pages/user.html'));
    },

    post: (req, res) => {
        connection.query(`SELECT password, isAdmin FROM users WHERE username = ?`, [req.body.username], (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                    if (err) throw err;

                    if (result) {
                        if (results[0].isAdmin === 1) {
                            res.sendFile(path.join(__dirname, '../pages/admin.html'));
                        } else {
                            res.sendFile(path.join(__dirname, '../pages/user.html'));
                        }
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
        connection.query(`SELECT COUNT(*) FROM users WHERE username = ?`, [req.body.username], (err, results) => {
            if (err) throw err;
            if (results[0]['COUNT(*)'] > 0) {
                res.status(401).json({ error: 'Username already exists' });
                return;
            }

            connection.query(`SELECT MAX(id) FROM users`, (err, results) => {
                if (err) throw err;
                const newid = (results[0]['MAX(id)'] + 1);

                const { username, password } = req.body;
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) throw err;

                    connection.query(`INSERT INTO users (id, username, password, isAdmin) VALUES (?, ?, ?, 0)`, [newid, username, hash], (err) => {
                        if (err) throw err;
                        res.sendFile(path.join(__dirname, '../pages/user.html'));
                    });
                });
            });
        });
    }
};
