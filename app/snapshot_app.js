
Snapshot = function(image, comment) {
    this.image = image;
    this.comment = comment;
}

document.getElementById('addphoto').addEventListener('change', function () {
    const img = this.files[0];
    saveImage(img, (imgURL) => {
        snapshot = new Snapshot(imgURL);
        saveSnapshot(snapshot, 
            () => {
                //placeholder to handle response
            });
    });
});