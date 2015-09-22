module.exports = function(nodeConfig) {
    var config = nodeConfig ? nodeConfig.applesauce : {};
    config.diary = config.diary ? config.diary : '55ff62e0c8780d231d8bba6b';
    config.server = config.server ? config.server : 'localhost';
    config.port = config.port ? config.port : '3000';

    return config;
};
