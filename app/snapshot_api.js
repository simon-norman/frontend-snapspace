
postSnapshot = (data, callback) => {
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