const express = require('express');
const app = express();
const path = require('path');

const sendFileOptions = {
  root: __dirname
}

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile('./views/snapshot_view.html', sendFileOptions);
});

app.listen(process.env.PORT || 8080);

console.log("Listening at 8080")