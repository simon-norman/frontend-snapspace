
const AWS = require('aws-sdk'),
      Snapshot = require('../models/snapshots.js'),
      mongoose = require('mongoose'),
      config = require('../config.js').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;

saveSnapshot = (req, res) => {
    const snapshot = new Snapshot({
        imageURL: req.body.imageURL, 
        comment: req.body.comment
    });
    snapshot.save( (err, result) => {
        if (err) {
            //placeholder for error handling
        } else {
            res.sendStatus(200);
        }
    });
}

getAmazonConfig = (req, res) => {
    let amazonConfig = '{ "url":"' + config.aws.url +
    '", "bucketName" :"' + config.aws.bucketname + 
    '", "secretKey":"' + process.env.AWS_SECRET_ACCESS_KEY +
    '", "accessKey":"' + process.env.AWS_ACCESS_KEY_ID +
    '"}';
    console.log(amazonConfig);
    amazonConfig = JSON.parse(amazonConfig);
    res.send(amazonConfig);
}

module.exports.saveSnapshot = saveSnapshot;
module.exports.getAmazonConfig = getAmazonConfig;

