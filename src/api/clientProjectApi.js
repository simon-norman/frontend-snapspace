import Api from './Api';

export default class SnapshotApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });

    this.clientPath = '/client';
  }
  
  postClient(params) {
    return this.axios.post(this.clientPath, params);
  }
}
