const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
// const secret = require('../config').secret;

const UserSchema = new mongoose.Schema(
	{
		name: {type: String, required: [true, "name can't be blank"]},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: [true, " email can't be blank"],
			match: [/\S+@\S+\.\S+/, 'invalid email'],
			index: true,
		},
		salt: {type: String},
		hash: {type: String},
	},
	{timestamps: true}
);

UserSchema.plugin(uniqueValidator, {message: 'email is already taken.'});

UserSchema.methods.setPassword = async function (password) {
	this.salt = await bcrypt.genSalt();
	this.hash = await bcrypt.hash(password, this.salt);
};

UserSchema.methods.validPassword = async function (password) {
	const hash = await bcrypt.hash(password, this.salt);
	return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			id: this._id,
			email: this.email,
			exp: parseInt(exp.getTime() / 1000),
		},
		secret
	);
};

UserSchema.methods.toAuthJSON = function () {
	return {
		id: this._id,
		name: this.name,
		email: this.email,
		token: this.generateJWT(),
	};
};

module.exports = mongoose.model('User', UserSchema);
