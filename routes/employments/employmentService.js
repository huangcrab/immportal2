"use strict";

const { model: Employment } = require("./employmentModel");

module.exports.removeEmployment = async id => {
  try {
    return await Employment.findOneAndDelete({ _id: id });
  } catch (e) {
    throw e;
  }
};

module.exports.create = async fields => {
  try {
    return await new Employment(fields).save();
  } catch (e) {
    throw e;
  }
};

module.exports.getEmployments = async profileId => {
  try {
    return await Employment.find({ profile: profileId });
  } catch (e) {
    throw e;
  }
};
