
Snapshot = function(image, comment) {
    this.image = image;
    this.comment = comment;
}

imgToBase64 = (img, returnBase64) => {
    const reader = new FileReader();
    reader.onload = () => {
        returnBase64(reader.result);
    };
    reader.readAsDataURL(img);
}

document.getElementById('addphoto').addEventListener('change', function () {
    const img = this.files[0];
    imgToBase64(img, function (imgBase64) {
        snapshot = new Snapshot(imgBase64);
    });
});