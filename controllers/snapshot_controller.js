
const AWS = require('aws-sdk');
      config = require('../config.js').get(process.env.NODE_ENV);

saveSnapshot = (req, res) => {
    console.log('saveSnapshot called');
    saveImage(req.body.image, (imageURL) => {
        console.log(imageURL);
        res.send('Done!');
    });
}

saveImage = (base64Image, callback) => {
    const s3 = new AWS.S3();

    const imageKey = Date.now() + ".jpg";

    const bucketName = config.aws.bucketname;
    console.log(bucketName);

    const binaryImage = Buffer.from(base64Image, 'base64');

    const imageURL = 'https://s3.us-east-2.amazonaws.com/' + bucketName + '/' + imageKey;

    params = {Bucket: bucketName, Key: imageKey, Body: base64Image };
    s3.putObject(params, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            callback(imageURL);
        }
     });
}

module.exports.saveImage = saveImage;
module.exports.saveSnapshot = saveSnapshot;

