"use strict";

const { model: Application } = require("./applicationModel");
const applicationFormService = require("../applicationForms/applicationFormService");

const preApprove = (form, fields) => {
  let result = false;
  if (form.validation) {
    if (form.validation.has && Object.keys(form.validation.has) > 0) {
      Object.keys(form.validation.has).forEach(rule => {
        if (fields[rule]) {
          result = true;
        } else {
          result = false;
        }
      });
    }
  }

  return result;
};

exports.findApplicationsByUserId = async id => {
  try {
    return await Application.find({ user: id }).populate("applicationForm", [
      "name",
      "description"
    ]);
  } catch (e) {
    throw e;
  }
};

exports.findApplicationById = async id => {
  try {
    return await Application.findOne({ _id: id }).populate("applicationForm", [
      "name",
      "description"
    ]);
  } catch (e) {
    throw e;
  }
};
exports.findAllApplications = async () => {
  try {
    return await Application.find().populate("applicationForm", [
      "name",
      "description"
    ]);
  } catch (e) {
    throw e;
  }
};

module.exports.updateApplication = async (id, fields) => {
  try {
    return await Application.findOneAndUpdate(
      { _id: id },
      { $set: fields },
      { new: true }
    );
  } catch (e) {
    throw e;
  }
};

module.exports.createApplication = async fields => {
  try {
    if (fields.applicationForm) {
      const form = await applicationFormService.findApplicationFormById(
        fields.applicationForm
      );
      const approve = preApprove(form, fields);
      fields.preApprove = approve;
    }

    return await new Application(fields).save();
  } catch (e) {
    throw e;
  }
};

module.exports.removeApplication = async id => {
  try {
    return await Application.findOneAndDelete({ _id: id });
  } catch (e) {
    throw e;
  }
};
