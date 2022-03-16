const express = require('express');
const cors = require('cors');
const connectdb = require('./database');
const env = require('dotenv');
const app = express();

//const sendSms = require('./services/sendSms').default;

// env config
env.config();

// database config
connectdb();

// Midelewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  })
);

// routes
app.get('/', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/auth', require('./routes/authRoutes'));

app.use('/account', require('./routes/accountRoutes'));

app.use('/forget', require('./routes/forgetRoutes'));

app.use('/verify', require('./routes/verifyRouters'));

app.use('/payment', require('./routes/transactionRoutes'));

app.use('/upload', require('./routes/uploadRoutes'));

app.use('/uploads', express.static(__dirname + '/uploads'));

// Listening port
app.listen(8080);
