"use strict";

const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const profileService = require("../profiles/profileService");
const educationService = require("./educationService");

const validateEducationInput = require("../../utils/validation/education");

//@route     GET api/educations/
//@desc      get educations
//@access    PRIVATE
router.get("/", auth, async (req, res, next) => {
  try {
    const profile = await profileService.findProfileById(req.user.id);
    if (profile.id) {
      const educations = await educationService.getEducations(profile.id);
      res.json({ result: educations });
    } else {
      res.status(404).json({ message: "Profile is not found" });
    }
  } catch (e) {
    throw e;
  }
});

//@route     POST api/educations/
//@desc      add or update educations
//@access    PRIVATE

router.post("/", auth, async (req, res, next) => {
  const { errs, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errs);
  }
  try {
    const profile = await profileService.findProfileById(req.user.id);
    const newEducation = {
      profile: profile.id,
      major: req.body.major,
      degree: req.body.degree,
      school: req.body.school,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current
    };

    const savedEducation = await educationService.create(newEducation);

    profile.education.unshift(savedEducation.id);
    profileService.createProfile(profile);

    res.json({ result: [profile] });
  } catch (e) {
    next(e);
  }
});

//@route     DELETE api/educations/:edu_id
//@desc      Delete education
//@access    PRIVATE
router.delete("/:edu_id", auth, async (req, res, next) => {
  try {
    const profile = await profileService.findProfileById(req.user.id);
    const removeIndex = profile.education
      .map(edu => edu.id)
      .indexOf(req.params.edu_id);
    console.log(profile.education.map(edu => edu._id));
    console.log(req.params.edu_id);
    if (removeIndex !== -1) {
      profile.education.splice(removeIndex, 1);
      try {
        const removed = await educationService.removeEducation(
          req.params.edu_id
        );
        const newProfile = await profileService.createProfile(profile);
        res.json({ result: [{ profile: newProfile }, { removed }] });
      } catch (e) {
        next(e);
      }
    } else {
      res.status(404).json({ message: "Education is not found" });
    }
  } catch (e) {
    next(e);
  }
});

exports.router = router;
