const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = (req, res, next) => {
    console.log("ENTRO EL TOKEN");
const token = req.headers['x-access-token'];
console.log(token);
if (!token) return res.status(403).send({ message: 'No tokenprovided.' });

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>
{
if (err) return res.status(500).send({ message: 'Failed toauthenticate token.' });
console.log("SALIO EL TOKEN");
req.userId = decoded.id;
next();
});
};