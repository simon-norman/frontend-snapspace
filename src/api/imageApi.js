import axios from 'axios';

export default class ImageApi {
  constructor() {
    this.axios = axios.create({
      responseType: 'json',
    });
  }

  putImage(URL, imageFile, params) {
    return this.axios.put(URL, imageFile, params);
  }
}
