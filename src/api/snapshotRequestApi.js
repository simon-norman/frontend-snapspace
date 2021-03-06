import Api from './Api';

export default class SnapshotRequestApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });
    
    this.baseRequestsPath = '/client/clientId/project/projectId/snapshotRequests';
  }

  requestsPath(clientId, projectId) {
    const finalRequestsPath = this.baseRequestsPath.replace('clientId', clientId);
    return finalRequestsPath.replace('projectId', projectId);
  }

  getSnapshotRequests(clientId, projectId) {
    return this.axios.get(this.requestsPath(clientId, projectId));
  }

  postRequests(clientId, projectId, body) {
    return this.axios.post(this.requestsPath(clientId, projectId), body);
  }
}
