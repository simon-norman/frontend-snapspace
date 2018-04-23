
const expect = require('chai').expect,
      assert = require('assert'),
      config = require('../../config.js').get(process.env.NODE_ENV),
      Snapshot = require('../../models/snapshots.js'),
      mongoose = require('mongoose');

      mongoose.Promise = global.Promise;

describe('createSnapshotRecord', () => {
    before((done) => {
        mongoose.connect(config.database.uri);
        mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.log(error);
        });
    });
    
    beforeEach( (done) => {
        mongoose.connection.collections.snapshots.drop( () => {
            done();
        });
    });

    it('should create a new snapshot record', (done) => {
        const snapshot = new Snapshot({imageURL: 'URL', comment: 'comment'});
        snapshot.save()
        .then(() => {
            assert(!snapshot.isNew);
            done();
        });
    });
});

