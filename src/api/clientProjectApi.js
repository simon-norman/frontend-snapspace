import Api from './Api';

export default class SnapshotApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });

    this.clientPath = '/client';

    this.baseProjectPath = '/client/clientId/project';
  }

  projectPath(clientId) {
    const finalRequestsPath = this.baseProjectPath.replace('clientId', clientId);
    debugger;
    return finalRequestsPath;
  }
  
  postClient(body) {
    return this.axios.post(this.clientPath, body);
  }

  postProject(clientId, body) {
    debugger;
    return this.axios.post(this.projectPath(clientId), body);
  }
}
