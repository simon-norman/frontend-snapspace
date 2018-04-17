

$(document).ready(function() {

    document.getElementById('addphoto').addEventListener('change', function() {
        var file = this.files[0];
        console.log(file);
    });

    

});
