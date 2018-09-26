const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');
const app = express();
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log('server up on port', port);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});