const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(require('body-parser').urlencoded({extended: true}));

require('./models/User');

app.use('/users', require('./routes/user'));
app.use('/home', require('./routes/home'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
	console.log(`Server started on port ${PORT}`)
);
