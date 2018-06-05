import Api from './Api';

export default class SnapshotRequestApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });
    
    this.requestsPath = '/snapshotRequests';
  }

  getSnapshotRequests() {
    return this.axios.get(this.requestsPath);
  }

  saveRequests() {
    return this.axios.post(this.requestsPath);
  }
}
