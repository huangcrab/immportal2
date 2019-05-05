"use strict";

const { model: Profile } = require("./profileModel");

exports.findProfileById = async id => {
  try {
    return await Profile.findOne({ user: id })
      .populate("user", ["name", "avatar"])
      .populate("employment", ["title", "company", "from", "to", "current"])
      .populate("education", [
        "degree",
        "school",
        "major",
        "from",
        "to",
        "current"
      ]);
  } catch (e) {
    throw e;
  }
};

exports.findAllProfiles = async () => {
  try {
    return await Profile.find().populate("user", ["name", "avatar"]);
  } catch (e) {
    throw e;
  }
};

module.exports.updateProfile = async (id, fields) => {
  try {
    return await Profile.findOneAndUpdate(
      { user: id },
      { $set: fields },
      { new: true }
    );
  } catch (e) {
    throw e;
  }
};

module.exports.createProfile = async fields => {
  try {
    return await new Profile(fields).save();
  } catch (e) {
    throw e;
  }
};
