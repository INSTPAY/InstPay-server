const express = require('express');
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

// routes
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', require('./routes/authRoutes'));

app.use('/account', require('./routes/accountRoutes'));

app.use('/payment', require('./routes/transactionRoutes'));

// const sendMail = require('./services/sendEmail');
// const sendSms = require('./services/sendSms');

// app.get('/mail', async (req, res) => {
//   res.status(200).json(await sendMail('playatanu@gmail.com', 'Hi'));
// });

// app.get('/sms', async (req, res) => {
//   res.status(200).json(await sendSms('6296843271', 'Hi'));
// });

// Listening port
app.listen(80);
