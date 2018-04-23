
saveImage = (file, callback) => {
        if (file) {
            getAmazonConfig( (amazonConfig) => {
                AWS.config.update({
                    "accessKeyId": amazonConfig.accessKey,
                    "secretAccessKey": amazonConfig.secretKey,
                    signatureVersion: 'v4'
                });
                const s3 = new AWS.S3();
                const imageKey = Date.now() + ".jpg";
                const params = {
                    Bucket: amazonConfig.bucketName,
                    Key: imageKey,
                    ContentType: file.type,
                    Body: file,
                    ACL: 'public-read'
                };        
                s3.putObject(params, function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback('https://s3.eu-west-2.amazonaws.com/snapspace-dev/' + imageKey);
                    }
                });
            });            
        } else {
        }
};

saveSnapshot = (data, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/snapshot', true);
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                callback(null, JSON.parse(xhr.responseText));
            }
            else {
                callback(xhr.status);
            }
        }
    };

    console.log(data);
    xhr.send(JSON.stringify(data));
};

getAmazonConfig = (callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/amazon-config', true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
            else {
                callback(xhr.status);
            }
        }
    };
    xhr.send();
};