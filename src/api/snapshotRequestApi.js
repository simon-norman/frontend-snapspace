import Api from './Api';

export default class SnapshotRequestApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });
    
    this.snapshotPath = '/snapshotRequests';
  }

  getSnapshotRequests() {
    return this.axios.get(this.snapshotsPath);
  }
}
