
var config = {

  production: {
    aws: {
      bucketname: 'snapspace',
    },
  },

  test: {
    aws: {
      bucketname: 'snapspace-test',
    },
  },

  development: {
    aws: {
      bucketname: 'snapspace-dev',
    },
    app: {
      port: 8080
    }
  }

}

exports.get = function get(env) {
  return config[env];
}