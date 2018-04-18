
postSnapshot = (data, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://snapspace-test.herokuapp.com/postSnapshot', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback();
        }
    };

    xhr.send(JSON.stringify(data));
};