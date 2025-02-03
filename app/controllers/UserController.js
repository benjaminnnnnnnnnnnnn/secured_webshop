const path = require('path');

module.exports = {
    get: (req, res) => {
        res.sendFile(path.join(__dirname, '../pages/user.html'));
    },
    post: (req, res) => {


        if (req.body.username === 'admin' && req.body.password === 'admin') {
            res.sendFile(path.join(__dirname, '../pages/admin.html'));
        } else {
            res.sendFile(path.join(__dirname, '../pages/user.html'));
        }
    }
};
