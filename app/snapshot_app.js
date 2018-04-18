function Snapshot(image, comment) {
    this.image = image;
    this.comment = comment;
}

// document.getElementById('addphoto').addEventListener('change', function () {
//     const img = this.files[0];
//     console.log(img);
//     imgToBase64(img, function (imgBase64) {
//         snapshot = new Snapshot(imgBase64);
//     });
// });

function imgToBase64(img, returnBase64) {
    const reader = new FileReader();
    reader.onload = function () {
        let base64 = reader.result;
        console.log(base64);
        returnBase64(base64);
    };
    reader.readAsDataURL(img);
}