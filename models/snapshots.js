const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

    const SnapshotSchema = new Schema({
        imageURL: String,
        comment: String
    });

    const Snapshot = mongoose.model('snapshot', SnapshotSchema);

    module.exports = Snapshot;