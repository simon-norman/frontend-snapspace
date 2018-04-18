const expect = require('chai').expect,
    fs = require('fs'),
    fileAPI = require('file-api'),
    file = fileAPI.File,
    jsdom = require('jsdom');


describe('takePhoto', function () {
   const imgToBase64 = require('../app/snapshot_app').imgToBase64;
    it('should convert a file object into Base 64 for transfer to server', function () {
        const testFile = new file("./base64_test.jpg");
        console.log(file);
        imgToBase64(testFile, function (base64File) {
            console.log(base64File);
        })
    });
})