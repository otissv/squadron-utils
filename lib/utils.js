/*
* utility helper  methods
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.compareHash = compareHash;
exports.generateHash = generateHash;
exports.fetch = fetch;
exports.find = find;
exports.findByField = findByField;
exports.cleanObject = cleanObject;
exports.isCollectionEmpty = isCollectionEmpty;
exports.isObjectEmpty = isObjectEmpty;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.promise = promise;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Encryption helper methods
* ==========================
*/
function compareHash(_ref) {
  var data = _ref.data,
      hash = _ref.hash;

  return _bcryptNodejs2.default.compareSync(data, hash);
}

function generateHash(data) {
  return _bcryptNodejs2.default.hashSync(data, _bcryptNodejs2.default.genSaltSync(8), null);
}

/*
* AJAX helper methods
* ==========================
*/
function fetch(args) {
  var assert = args.assert,
      method = args.method,
      url = args.url,
      data = args.data;


  var options = void 0;

  if (method === 'post' || method === 'put') {
    options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  }

  (0, _axios2.default)({ method: method, url: url, data: data, options: options }).then(function (response) {
    assert(response.data);
  }).catch(function (response) {
    console.log(response);
    assert(response);
  });
}

/*
* Mock helper methods
* ==========================
*/
function find(_ref2) {
  var query = _ref2.query,
      mock = _ref2.mock;

  var field = 'id';

  if (Array.isArray(query)) return [mock.find(function (a) {
    return query.find(function (q) {
      return q[field] === a[field];
    });
  })];
  if (query[field]) return mock.filter(function (item) {
    return item[field] === query[field];
  })[0];
  return mock;
}

function findByField(_ref3) {
  var query = _ref3.query,
      mock = _ref3.mock,
      field = _ref3.field;

  if (query[field]) return mock.filter(function (item) {
    return item[field] === query[field];
  })[0];
  return mock.filter(function (item) {
    return item[field] === query;
  })[0];
}

/*
* Object helper methods
* ==========================
*/
function cleanObject(obj) {
  Object.keys(obj).forEach(function (key) {
    return obj[key] && _typeof(obj[key]) === 'object' && cleanObject(obj[key]) || (obj[key] === undefined || obj[key] === null) && delete obj[key];
  });
  return obj;
}

function isCollectionEmpty(arry) {
  return arry.map(function (i) {
    return isObjectEmpty(arry);
  }).every(function (b) {
    return b === true;
  });
}

function isObjectEmpty(obj) {
  function check(val) {

    // checks if object is truthy or falsey
    if (!val || val.trim === '') return true;

    // checks objects length property (array)
    if (val.length && val.length === 0) return true;
    if (Object.keys(val).length === 0) return true;
  }

  // checks all object properties are empty
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return check(obj[key]);
    };
  }

  return check(obj);
}

/*
* Token helper methods
* ==========================
*/
function generateToken(_ref4) {
  var payload = _ref4.payload,
      token = _ref4.token;

  var jwToken = _jsonwebtoken2.default.sign(payload, token);
  return jwToken;
}

function verifyToken(_ref5) {
  var payload = _ref5.payload,
      token = _ref5.token;

  _jsonwebtoken2.default.verify(token, payload);
}

/*
* Promise helper methods
* ==========================
*/
function promise(fn) {
  return new _bluebird2.default(function (resolve, reject) {
    return fn(resolve, reject);
  });
};