
const AWS = require('aws-sdk');
      config = require('../config.js').get(process.env.NODE_ENV);

saveSnapshot = (req, res) => {
    console.log('saveSnapshot called');
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

