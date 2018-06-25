import Api from './Api';

export default class LogErrorApi extends Api {
  constructor() {
    super({ baseURL: process.env.SNAPSPACE_API });
    
    this.messageLogPath = '/message';
  }

  logMessageToServer(message) {
    this.axios.post(this.messageLogPath, message);
  }
}
