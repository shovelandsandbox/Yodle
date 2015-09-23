module.exports = function() {
    var config = {};
    config.diary = process.env.DIARY ? process.env.DIARY : '56020aa06e6eb7191012b6d9';
    config.server = process.env.HOST ? process.env.HOST : 'localhost';
    config.port = process.env.PORT ? process.env.PORT : '3000';

    return config;
};
