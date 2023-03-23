const https = require('https');
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get('/ping', (req, res) => {
  const url = req.originalUrl;

  const domain = url.split('=')[1]; // obtiene el segundo elemento del array generado por split()

  console.log(domain);
  console.log(`https://${domain}`);

  // console.log(req)
  https.get(`https://${domain}`, (response) => {
    console.log(response.statusCode);
    res.json({ online: 'online' });
  }).on('error', (error) => {
    console.log(error, 500);
    res.json({ online: 'offline' });

  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
