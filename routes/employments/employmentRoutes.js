"use strict";

const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const profileService = require("../profiles/profileService");
const employmentService = require("./employmentService");

const validateEmploymentInput = require("../../utils/validation/employment");

//@route     GET api/employments/
//@desc      get employments
//@access    PRIVATE
router.get("/", auth, async (req, res, next) => {
  try {
    const profile = await profileService.findProfileById(req.user.id);
    if (profile.id) {
      const employments = await employmentService.getEmployments(profile.id);
      res.json({ result: employments });
    } else {
      res.status(404).json({ message: "Profile is not found" });
    }
  } catch (e) {
    throw e;
  }
});

//@route     POST api/employments/
//@desc      add or update employment
//@access    PRIVATE

router.post("/", auth, async (req, res, next) => {
  const { errs, isValid } = validateEmploymentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errs);
  }
  try {
    const profile = await profileService.findProfileById(req.user.id);
    const newEmployment = {
      profile: profile.id,
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current
    };

    const savedEmployment = await employmentService.create(newEmployment);

    profile.employment.unshift(savedEmployment.id);
    profileService.createProfile(profile);

    res.json({ result: [profile] });
  } catch (e) {
    next(e);
  }
});

//@route     DELETE api/employments/:emp_id
//@desc      Delete employment
//@access    PRIVATE
router.delete("/:emp_id", auth, async (req, res, next) => {
  try {
    const profile = await profileService.findProfileById(req.user.id);
    const removeIndex = profile.employment
      .map(emp => emp.id)
      .indexOf(req.params.emp_id);

    if (removeIndex !== -1) {
      profile.employment.splice(removeIndex, 1);
      try {
        const removed = await employmentService.removeEmployment(
          req.params.emp_id
        );
        const newProfile = await profileService.createProfile(profile);
        res.json({ result: [{ profile: newProfile }, { removed }] });
      } catch (e) {
        next(e);
      }
    } else {
      res.status(404).json({ message: "Employment is not found" });
    }
  } catch (e) {
    next(e);
  }
});

exports.router = router;
