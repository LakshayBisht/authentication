// const jwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

function getTokenFromHeader(authorization) {
	if (
		(authorization && authorization.split(' ')[0] === 'Token') ||
		(authorization && authorization.split(' ')[0] === 'Bearer')
	) {
		return authorization.split(' ')[1];
	}

	return null;
}

const auth = (req, res, next) => {
	const token = getTokenFromHeader(req.headers.authorization);
	try {
		const decoded = jwt.verify(token, secret);
		req.payload = decoded;
		next();
	} catch (error) {
		res.json({error: 'Wrong Token'});
	}
};

module.exports = auth;
