module.exports = function(nodeConfig) {
    var config = nodeConfig ? nodeConfig.applesauce : {};
    config.diary = config.diary ? config.diary : '56020aa06e6eb7191012b6d9';
    config.server = config.server ? config.server : 'localhost';
    config.port = config.port ? config.port : '3000';

    return config;
};
