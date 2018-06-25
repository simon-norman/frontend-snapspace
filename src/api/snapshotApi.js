import Api from './Api';

export default class SnapshotApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });
    
    this.imageUploadConfigPath = '/image-upload-config';
    this.snapshotPath = '/snapshot';
    this.snapshotsPath = '/snapshots';
  }

  getImageUploadConfig(params) {
    return this.axios.get(this.imageUploadConfigPath, params);
  }
  
  postSnapshot(params) {
    return this.axios.post(this.snapshotPath, params);
  }

  getSnapshots() {
    return this.axios.get(this.snapshotsPath);
  }
}
