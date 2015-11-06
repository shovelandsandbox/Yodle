function Yodle(config, api) {
  this.config = config;
	var Api = api ? api : require('./lib/api');


  var apiConfig = {
    server: config && config.server ? config.server : 'yodle.yetilogs.com',
    port: config && config.port ? config.port : 80,
    protocol: config && config.protocol ? config.protocol : 'https',
    token: config ? config.token : ''
  };


  this.api = new Api(apiConfig);
}

Yodle.getInstance = function(config, api) {
  return new Yodle(config, api);
}

require('./merge')(Yodle, __dirname + '/lib/commands/*.js');

exports = module.exports = Yodle;


// module.exports = function Yodle(config, api) {
//   this.config = config;
//   var Api = api ? api : require('./lib/api');
//   this.api = new Api(config);

//   console.log(this);

//   require('./merge')(this, __dirname + '/lib/commands/*.js');
// };


// exports default class Yodle {
//   constructor(config, api = require('./lib/api')) {
//     this.config = config;
//     this.api = new api(config);
//   }
// }
