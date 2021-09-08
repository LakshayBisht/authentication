const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const auth = require('./auth');

router.post('/signup', async (req, res, next) => {
	if (!req.body.user) return res.json({error: 'user inputs are required'});
	const {name, email, password} = req.body.user;
	if (!(req.body.user && name && email && password)) {
		return res.status(422).json({error: 'All input are required'});
	}
	const oldUser = await User.findOne({email});
	if (oldUser) {
		return res.status(422).json({error: 'User already exist.'});
	}
	const user = new User();
	user.name = name;
	user.email = email;
	user.setPassword(password);

	user
		.save()
		.then(function () {
			return res.status(201).json({
				message: 'user created successfully',
				user: user.toAuthJSON(),
			});
		})
		.catch(next);
});

router.post('/login', async function (req, res) {
	const {email, password} = req.body.user;
	if (!email) return res.status(422).json({errors: {email: "can't be blank"}});

	if (!password)
		return res.status(422).json({errors: {password: "can't be blank"}});

	const user = await User.findOne({email});
	if (!user) return res.status(403).json({error: 'user does not exist'});
	if (await user.validPassword(password))
		return res.json({user: user.toAuthJSON()});
	return res.status(403).json({error: 'wrong password'});
});

module.exports = router;
