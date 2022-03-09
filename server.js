const express = require('express');
const passport = require('passport');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', require('./routes/authRoutes'));

app.listen(80);
