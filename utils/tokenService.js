"use strict";
const jwt = require("jsonwebtoken");

const { SECRET } = require("./constants");

exports.issueToken = user => {
  return jwt.sign(user, SECRET);
};

exports.verify = token => {
  return jwt.verify(token, SECRET);
};
