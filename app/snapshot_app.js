
var snapshotModule = ( function() {
    'use strict';
    
    var snapshot = {
        "imageURL": '',
        "comment": '',
    };

    var image = '';

    function saveSnapshot(image) {
        snapshotModuleAPI.saveImage(image, (imageURL) => {
            snapshot.imageURL = imageURL;
            snapshotModuleAPI.saveSnapshot(snapshot,
                () => {
                    //placeholder to handle response
                });
        });
    }

    document.getElementById('addphoto').addEventListener('change', function () {
        image = this.files[0];
        saveSnapshot(image);
    });

}());