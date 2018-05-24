import Api from './Api';

export default class ImageApi extends Api {
  putImage(URL, imageFile, params) {
    return this.axios.put(URL, imageFile, params);
  }
}
