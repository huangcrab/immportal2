"use strict";

const { model: Education } = require("./educationModel");

module.exports.removeEducation = async id => {
  try {
    return await Education.findOneAndDelete({ _id: id });
  } catch (e) {
    throw e;
  }
};

module.exports.create = async fields => {
  try {
    return await new Education(fields).save();
  } catch (e) {
    throw e;
  }
};
module.exports.getEducations = async profileId => {
  try {
    return await Education.find({ profile: profileId });
  } catch (e) {
    throw e;
  }
};
