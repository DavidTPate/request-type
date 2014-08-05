var requestType = require('..'),
    typeIs = require('type-is'),
    should = require('should');

function MockRequest() {

}

MockRequest.prototype.is = function (types) {
    if (!Array.isArray(types)) types = [].slice.call(arguments);
    return typeIs(this, types);
};

function MockResponse(cb) {
    this.cb = cb;
}

MockResponse.prototype.status = function (status) {
    this.status = status;
    return this;
};

MockResponse.prototype.send = function (data) {
    this.data = data;
    if (this.cb) {
        this.cb();
    }
};

describe('requestType(\'application/json\')', function () {
    it('should match a simple Content-Type', function (done) {
        var req = new MockRequest();
        req.headers = {};
        req.headers['content-type'] = 'application/json';
        req.headers['content-length'] = 16;

        requestType('application/json')(req, undefined, function () {
            done();
        });
    });
    it('should match an array of Content-Types', function (done) {
        var req = new MockRequest();
        req.headers = {};
        req.headers['content-type'] = 'application/json';
        req.headers['content-length'] = 16;

        requestType(['application/json', 'application/xml'])(req, undefined, function () {
            done();
        });
    });
    it('should match a wildcard Content-Type', function (done) {
        var req = new MockRequest();
        req.headers = {};
        req.headers['content-type'] = 'application/json';
        req.headers['content-length'] = 16;

        requestType('application/*')(req, undefined, function () {
            done();
        });
    });
    it('shouldn\'t match an incorrect Content-Type', function (done) {
        var req = new MockRequest();
        req.headers = {};
        req.headers['content-type'] = 'application/xml';
        req.headers['content-length'] = 16;

        var res = new MockResponse(function () {
            if (this.status === 415) {
                done();
            }
        });

        requestType('application/json')(req, res, undefined);
    });
    it('should handle no Content-Type being passed', function (done) {
        var req = new MockRequest();
        req.headers = {};
        req.headers['content-type'] = 'application/json';
        req.headers['content-length'] = 16;

        requestType()(req, undefined, function () {
            done();
        });
    });
    it('shouldn\'t match fully wildcarded Content-Type', function (done) {
        var req = new MockRequest();
        req.headers = {};
        req.headers['content-type'] = 'application/xml';
        req.headers['content-length'] = 16;

        var res = new MockResponse(function () {
            if (this.status === 415) {
                done();
            }
        });

        requestType('*')(req, res, undefined);
    });

});