const expect = chai.expect;

describe('Mocha', function () {
    // Test spec (unit test)
    it('should run our tests using NPM', function() {
       expect(true).to.be.ok;
    });
  })

describe('takePhoto', function () {

    it('should convert an image file object into Base 64 for transfer to server', function (done) {
        const testFile = new File(["test"], "test.jpg", {
            type: "image/jpeg",
        });

        imgToBase64(testFile, function (base64File) {
            expect(base64File).to.equal('data:image/jpeg;base64,dGVzdA==');
            done();
        })
    });
});

describe('postSnapshot', function () {

    beforeEach(function() {
        this.xhr = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.xhr.onCreate = function(xhr) {
            this.requests.push(xhr);
        }.bind(this);
    });

    afterEach(function() {
        this.xhr.restore();
    });

    it('should send snapshot object to the server as JSON body', function () {

        var data = { image: 'image', comment: 'comment' };
        var dataJson = JSON.stringify(data);

        postSnapshot(data, function () { });

    });
});