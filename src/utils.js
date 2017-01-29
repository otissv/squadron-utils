/*
* utility helper  methods
*/


'use strict';
import axios from 'axios';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';


/*
* Encryption helper methods
* ==========================
*/
export function compareHash ({ data, hash }) {
  return bcrypt.compareSync(data, hash);
}

export function generateHash (data) {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(8), null);
}


/*
* AJAX helper methods
* ==========================
*/
export function fetch (args) {
  const { assert, method, url, data } = args;

  let options;

  if (method === 'post' || method === 'put') {
    options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  }


  axios({ method, url, data, options })
    .then(function (response) {
      assert(response.data);
    })
    .catch(function (response) {
      console.log(response);
      assert(response);
    });
}


/*
* Mock helper methods
* ==========================
*/
export function find ({ query, mock }) {
  const field = 'id';

  if (Array.isArray(query)) return [ mock.find(a => query.find(q => q[field] === a[field])) ];
  if (query[field]) return mock.filter(item => item[field] === query[field])[0];
  return mock;
}


export function findByField ({ query, mock, field }) {
  if (query[field]) return mock.filter(item => item[field] === query[field])[0];
  return mock.filter(item => item[field] === query)[0];
}


/*
* Object helper methods
* ==========================
*/
export function cleanObject (obj) {
  Object.keys(obj).forEach(key =>
    ((obj[key] && typeof obj[key] === 'object') && cleanObject(obj[key])) ||
    ((obj[key] === undefined || obj[key] === null) && delete obj[key])
  );
  return obj;
}


export function isCollectionEmpty (arry) {
  return arry.map(i => isObjectEmpty(arry)).every(b => b === true);
}


export function isObjectEmpty (obj) {
  function check (val) {

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
export function generateToken ({ payload, token }) {
  const jwToken = jwt.sign(payload, token);
  return jwToken;
}


export function verifyToken ({ payload, token }) {
  jwt.verify(token, payload);
}


/*
* Promise helper methods
* ==========================
*/
export function promise (fn) {
  return new Promise((resolve, reject) => fn(resolve, reject));
};
