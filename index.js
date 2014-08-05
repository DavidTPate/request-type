var util = require('util');

module.exports = function (types) {
    if (types) {
        if (!Array.isArray(types)) {
            types = [types];
        }
        types.filter(function (type) {
            return (type);
        }).sort().join();
    }

    return function(req, res, next) {
        // If we have no types, there's nothing to check, so just continue on.
        if (!types || req.is(types)) {
            return next();
        }
        res.status(415).send(new RestError(415, 'UnsupportedMediaType', 'Unsupported Media Type ' + req.headers['content-type']));
    };
};

function RestError(statusCode, errorCode, message) {
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
}
util.inherits(RestError, Error);