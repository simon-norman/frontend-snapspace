
var config = {

  production: {
    aws: {
      bucketname: 'snapspace',
      url: 'https://s3.eu-west-2.amazonaws.com/'
    },
    database: {
      uri: process.env.MONGODB_URI
    }
  },

  test: {
    aws: {
      bucketname: 'snapspace-test',
      url: 'https://s3.eu-west-2.amazonaws.com/'
    },
    database: {
      uri: process.env.MONGODB_URI
    }
  },

  development: {
    aws: {
      bucketname: 'snapspace-dev',
      url: 'https://s3.eu-west-2.amazonaws.com/'
    },
    app: {
      port: 8080
    },
    database: {
      uri: 'mongodb://localhost:27017/snapspace_dev'
    }
  }

}

exports.get = function get(env) {
  return config[env];
}