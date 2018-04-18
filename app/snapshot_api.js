
postSnapshot = (data, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://snapspace-test.herokuapp.com/snapshot', true);

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

    xhr.send(JSON.stringify(data));
};