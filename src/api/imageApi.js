import Api from './Api';

export default class ImageApi extends Api {
  constructor() {
    super({ baseURL: '' });
  }
  putImage(URL, imageFile, params) {
    this.axios.put(URL, imageFile, params);
  }
}
