
function Snapshot(image, comment) {
    this.image = image;
    this.comment = comment;
}

function imgToBase64(img, returnBase64) {
    const reader = new FileReader();
    reader.onload = function () {
        let base64 = reader.result;
        console.log(base64);
        returnBase64(base64);
    };
    reader.readAsDataURL(img);
}

document.getElementById('addphoto').addEventListener('change', function () {
    const img = this.files[0];
    imgToBase64(img, function (imgBase64) {
        snapshot = new Snapshot(imgBase64);
    });
});