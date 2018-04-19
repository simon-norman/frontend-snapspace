
const AWS = require('aws-sdk');

saveImage = (base64Image, callback) => {
    const s3 = new AWS.S3();

    const imageKey = Date.now() + ".jpg";

    const bucketName = 'snapspace_test';

    const binaryImage = Buffer.from(base64Image, 'base64');

    const imageURL = 'https://s3.us-east-2.amazonaws.com/' + bucketName + '/' + imageKey;

    params = {Bucket: bucketName, Key: imageKey, Body: binaryImage };
    s3.putObject(params, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            callback(imageURL);
        }
     });
}

module.exports.saveImage = saveImage;

