import Api from './Api';

export default class SnapshotApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSCAPE_API });
    
    this.signedURLPath = '/image-aws-config';
    this.snapshotPath = '/snapshot';
    this.snapshotsPath = '/snapshots';
  }

  getSignedPostURL(params) {
    return this.axios.get(this.signedURLPath, params);
  }
  
  postSnapshot(params) {
    return this.axios.post(this.snapshotPath, params);
  }

  getSnapshots() {
    return this.axios.get(this.snapshotsPath);
  }
}
