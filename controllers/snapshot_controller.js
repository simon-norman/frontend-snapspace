
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
    console.log(snapshot);
    snapshot.save( (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(200);
            console.log(result);
        }
    });
}

getAmazonConfig = (req, res) => {
    let amazonConfig = '{ "url":"' + config.aws.url +
    '", "bucketName" :"' + config.aws.bucketName + 
    '", "secretKey":"' + config.aws.secretKey +
    '", "accessKey":"' + config.aws.accessKey +
    '", "region":"' + config.aws.region +
    '"}';
    console.log(amazonConfig);
    amazonConfig = JSON.parse(amazonConfig);
    res.send(amazonConfig);
}

module.exports.saveSnapshot = saveSnapshot;
module.exports.getAmazonConfig = getAmazonConfig;

