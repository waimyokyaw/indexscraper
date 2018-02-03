var env = process.env;

module.exports = {
  mongodbUri: 'mongodb://127.0.0.1:27017/nasdaqindex',
  port: env.PORT || 9000,
  host: env.HOST || '127.0.0.1',
  serverUrl : function() {
    return 'http://'+ this.host +':'+ this.port;
  }
};