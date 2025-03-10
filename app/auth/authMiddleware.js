const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; 

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log('No token provided');
        console.log(req.headers);
        return res.redirect('/login');
    }
    jwt.verify(token, secretKey, (err, decoded) => { 
        if (err) throw err;
        req.userId = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
    });
     
};

module.exports = verifyToken;