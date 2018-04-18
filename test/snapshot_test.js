const expect = chai.expect;


describe('takePhoto', function () {
    it('should convert a file object into Base 64 for transfer to server', function (done) {
        const testFile = new File(["test"], "test.jpg", {
            type: "image/jpeg",
          });
        imgToBase64(testFile, function (base64File) {
            console.log(base64File);
            expect(base64File).to.equal('data:image/jpeg;base64,dGVzdA==');
            done();
        })
    });
})