
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      config = require("./config.js").get(process.env.NODE_ENV),
      path = require('path'),
      snapshotController = require
      ("./controllers/snapshot_controller.js");

mongoose.connect(config.database.uri);
mongoose.connection
      .once('open', () => { console.log("DB connection complete") })
      .on('error', (error) => {
          console.log(error);
      });

const sendFileOptions = {
  root: __dirname
}

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.get('/', (req, res) => {
  res.sendFile('./views/snapshot_view.html', sendFileOptions);
});

app.get('/amazon-config', snapshotController.getAmazonConfig);

app.post('/snapshot', snapshotController.saveSnapshot);

app.listen(process.env.PORT || config.app.port);