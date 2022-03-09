const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.status.json({ status: 'ok' });
});

app.listen(80);
