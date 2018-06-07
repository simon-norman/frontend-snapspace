import Api from './Api';

export default class SnapshotRequestApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });
    
    this.baseRequestsPath = '/client/clientId/project/projectId/snapshotRequests';
  }

  requestsPath(clientId, projectId) {
    const finalRequestsPath = this.requestsPath.replace('clientId', clientId);
    return finalRequestsPath.replace('projectId', projectId);
  }

  getSnapshotRequests(clientId, projectId, body) {
    return this.axios.get(this.requestsPath(clientId, projectId), body);
  }

  saveRequests(clientId, projectId, body) {
    return this.axios.post(this.requestsPath(clientId, projectId), body);
  }
}
