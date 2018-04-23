
var config = {

  production: {
    aws: {
      bucketname: 'snapspace',
      url: 'https://s3.eu-west-2.amazonaws.com/'
    },
  },

  test: {
    aws: {
      bucketname: 'snapspace-test',
      url: 'https://s3.eu-west-2.amazonaws.com/'
    },
  },

  development: {
    aws: {
      bucketname: 'snapspace-dev',
      url: 'https://s3.eu-west-2.amazonaws.com/'
    },
    app: {
      port: 8080
    }
  }

}

exports.get = function get(env) {
  return config[env];
}