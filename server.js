const express = require('express');
const passport = require('passport');
const connectdb = require('./database');
const env = require('dotenv');
const app = express();

// env config
env.config();
// database config
connectdb();

// Midelewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', require('./routes/authRoutes'));

// Listening port
app.listen(80);
