
const expect = require('chai').expect,
    AWS = require('aws-sdk'),
    sinon = require('sinon'); 

describe('saveImage', () => {
    const saveImage = require('../../controllers/snapshot_controller').saveImage;

    beforeEach( () => {
        base64Image = 'data:image/jpeg;base64,dGVzdA==';
        const putObjectStub = AWS.S3.prototype.putObject = sinon.stub();
        putObjectStub.yields(null, 'https://');
    });

    it('should send a PUT call to Amazon S3', (done) => {
        saveImage(base64Image, (data) => {
            expect(data).to.be.a('string');
            done();
        });
    });
});

