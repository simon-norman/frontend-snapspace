import Api from './Api';

export default class SnapshotApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });

    this.clientPath = '/client';

    this.clientsPath = '/clients';

    this.baseProjectPath = '/client/clientId/project';
  }

  projectPath(clientId) {
    const finalRequestsPath = this.baseProjectPath.replace('clientId', clientId);
    return finalRequestsPath;
  }
  
  postClient(body) {
    return this.axios.post(this.clientPath, body);
  }

  postProject(clientId, body) {
    return this.axios.post(this.projectPath(clientId), body);
  }

  getClients() {
    return this.axios.get(this.clientsPath);
  }
}
