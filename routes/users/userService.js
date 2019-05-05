"use strict";

const { model: User } = require("./userModel");

exports.findUserByEmail = async email => {
  try {
    return await User.findOne({ email });
  } catch (e) {
    throw e;
  }
};

exports.save = async user => {
  try {
    return await user.save();
  } catch (e) {
    throw e;
  }
};
