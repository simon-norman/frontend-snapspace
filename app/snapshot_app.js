
Snapshot = function(imageURL, comment) {
    this.imageURL = imageURL;
    this.comment = comment;
}

document.getElementById('addphoto').addEventListener('change', function () {
    const img = this.files[0];
    saveImage(img, (imageURL) => {
        snapshot = new Snapshot(imageURL);
        saveSnapshot(snapshot, 
            () => {
                //placeholder to handle response
            });
    });
});