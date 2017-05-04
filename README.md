# request-type

[![Greenkeeper badge](https://badges.greenkeeper.io/DavidTPate/request-type.svg)](https://greenkeeper.io/)

[![NPM version](https://badge.fury.io/js/request-type.svg)](http://badge.fury.io/js/request-type)
[![Build Status](https://travis-ci.org/DavidTPate/request-type.svg?branch=master)](https://travis-ci.org/DavidTPate/request-type)
[![Coverage Status](https://img.shields.io/coveralls/DavidTPate/request-type.svg?branch=master)](https://coveralls.io/r/DavidTPate/request-type)

Node.js Content-Type checking middleware.

## Install

#### NPM
```bash
$ npm install request-type
```

## Node.js
```js
var express    = require('express');
var requestType = require('request-type');

var app = express();

app.post('/', requestType('application/*'), function(req, res, next) {
    res.send('Success!');
});

app.put('/', requestType(['application/json', 'application/xml']), function(req, res, next) {
    res.send('Wunderbar!');
});

```

## License

  [MIT](LICENSE)