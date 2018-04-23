
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      config = require('./config.js').get(process.env.NODE_ENV),
      path = require('path'),
      snapshotController = require
      ("./controllers/snapshot_controller.js");

const sendFileOptions = {
  root: __dirname
}

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.get('/', (req, res) => {
  res.sendFile('./views/snapshot_view.html', sendFileOptions);
});

app.post('/snapshot', snapshotController.saveSnapshot);

app.listen(process.env.PORT || config.app.port);