import axios from 'axios';

class Api {
    constructor(headers) {
        this.axios = axios.create({
            baseURL: ,
            responseType: 'json',
            headers
        })
    }

    this.awsImgConfig = '/image-aws-config';
    this.anotherUrl = 'something-else'

    getImgConfig(params) {
        return this.axios.get(this.awsImgConfig, params)
    }



    getAnotherThing() {

    }
}