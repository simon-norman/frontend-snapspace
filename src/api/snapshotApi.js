import axios from 'axios';

export default class SnapshotApi {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.SNAPSPACE_API,
      responseType: 'json',
    });
    this.signedURLPath = '/image-aws-config';
    this.snapshotPath = '/snapshot';
  }

  getSignedPostURL(params) {
    return this.axios.get(this.signedURLPath, params);
  }
  
  postSnapshot(params) {
    return this.axios.post(this.snapshotPath, params);
  }
}
