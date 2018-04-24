
var snapshotModule = ( function() {
    'use strict';
    
    var snapshot = {
        imageURL: '',
        comment: ''
    };

    var image = '';

    function saveSnapshot(image, comment) {
        snapshotModuleAPI.saveImage(image, (imageURL) => {
            snapshot.imageURL = imageURL;
            snapshot.comment = comment;
            console.log(snapshot);
            snapshotModuleAPI.saveSnapshot(snapshot,
                () => {
                    //placeholder to handle response
                });
        });
    }

    document.getElementById('addphoto').addEventListener('change', function () {
        image = this.files[0];
        $("#photomessage").text('Photo added');
    });

    document.getElementById('submit').addEventListener('click', function () {
        var comment = document.getElementById("snapshotcomment").value;
        saveSnapshot(image, comment);
    });

}());