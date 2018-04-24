const expect = chai.expect;
chai.should();

describe('Mocha', function () {
    it('should run our tests using NPM', function() {
       expect(true).to.be.ok;
    });
  })

describe('saveSnapshot', function () {
        let data;

    before(function () {
        data = { image: 'image', comment: 'comment' };
    });

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
        var dataJson = JSON.stringify(data);

        snapshotModuleAPI.saveSnapshot(data, function () { });

        this.requests[0].requestBody.should.equal(dataJson);
    });

    it('should return appropriate code when request failed', function (done) {
        var dataJson = JSON.stringify(data);

        snapshotModuleAPI.saveSnapshot(data, function(err, result) {
            err.should.exist;
            done();
        });

        this.requests[0].respond(500);
    });
});