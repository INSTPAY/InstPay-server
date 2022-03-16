const express = require('express');
const cors = require('cors');
const connectdb = require('./database');
const env = require('dotenv');
const app = express();

//websockets
const WebSocket = require('ws');

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws, req) => {
  ws.id = req.headers['account'];

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      if (client.id == '850567575') client.send('im fom account 850567575');
    }
  });
});

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

app.get('/ws/:id', (req, res) => {
  const id = req.params.id;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      if (client.id == id)
        client.send(
          JSON.stringify({
            id: id,
            event: 'create ac',
          })
        );
    }
  });
  res.send('sending ' + id);
});

// Listening port
server.listen(8080);
