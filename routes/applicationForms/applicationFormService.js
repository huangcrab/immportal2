"use strict";

const { model: ApplicationForm } = require("./applicationFormModel");

exports.findApplicationForms = async () => {
  try {
    return await ApplicationForm.find();
  } catch (e) {
    throw e;
  }
};

exports.findApplicationFormById = async id => {
  try {
    if (id) {
      return await ApplicationForm.findOne({ _id: id });
    }
    return null;
  } catch (e) {
    throw e;
  }
};

module.exports.updateApplicationForm = async (id, fields) => {
  try {
    return await ApplicationForm.findOneAndUpdate(
      { _id: id },
      { $set: fields },
      { new: true }
    );
  } catch (e) {
    throw e;
  }
};

module.exports.createApplicationForm = async fields => {
  try {
    return await new ApplicationForm(fields).save();
  } catch (e) {
    throw e;
  }
};

module.exports.removeApplicationForm = async id => {
  try {
    return await ApplicationForm.findOneAndDelete({ _id: id });
  } catch (e) {
    throw e;
  }
};
