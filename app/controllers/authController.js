const db = require('../config/db.config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = (req, res) => {
const { username, password } = req.body;
const hashedPassword = bcrypt.hashSync(password, 8);

const query = 'INSERT INTO users (username, password) VALUES(?, ?)';
db.query(query, [username, hashedPassword], (err, result) =>
{
if (err) return res.status(500).send(err);

res.status(201).send({ id: result.insertId, username });
});
};

exports.login = (req, res) => {
const { username, password } = req.body;
console.log(username);

const query = 'SELECT * FROM users WHERE username = ?';
db.query(query, [username], (err, results) => {
if (err) return res.status(500).send(err);
if (results.length === 0) return res.status(404).send({
message: 'User not found' });

const user = results[0];
const passwordIsValid = bcrypt.compareSync(password, user.password);
if (!passwordIsValid) return res.status(401).send({ token:
null, message: 'Invalid Password' });

const token = jwt.sign({ id: user.id },
process.env.JWT_SECRET, { expiresIn: 86400 });
res.status(200).send({ id: user.id, username:
user.username, token });
});
};