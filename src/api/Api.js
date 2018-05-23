import axios from 'axios';

export default class Api {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.SNAPSPACE_API,
      responseType: 'json',
    });
    this.signedPostURL = '/image-aws-config';
  }

  getSignedPostURL(params) {
    return this.axios.get(this.signedPostURL, params);
  }
}
