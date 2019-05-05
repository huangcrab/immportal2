"use strict";

const express = require("express");
const router = express.Router();

const applicationFormService = require("./applicationFormService");
const roleCheck = require("../../middleware/roleCheck");
const auth = require("../../middleware/auth");

//@route     GET api/applicationForms/all
//@desc      get all applicationForms
//@access    PRIVATE
router.get("/", auth, async (req, res, next) => {
  try {
    const errs = {};
    const forms = await applicationFormService.findApplicationForms();

    if (forms.length === 0) {
      errs.noforms = "There is no froms available";
      return res.status(404).json(errs);
    }
    res.json({ result: forms });
  } catch (e) {
    next(e);
  }
});

//@route     GET api/applicationForms/:form_id
//@desc      get applicationForm by id
//@access    PRIVATE
router.get("/:form_id", auth, async (req, res, next) => {
  try {
    const errs = {};
    const forms = await applicationFormService.findApplicationFormById(
      req.params.form_id
    );

    if (forms.length === 0) {
      errs.noforms = "There is no froms available";
      return res.status(404).json(errs);
    }
    res.json({ result: forms });
  } catch (e) {
    next(e);
  }
});

//@route     POST api/applicationForms/:form_id
//@desc      create/update applicationForms
//@access    PRIVATE
router.post(
  "/",
  auth,
  roleCheck(["agent", "admin"]),
  async (req, res, next) => {
    try {
      const errs = {};
      const applicationFields = req.body;
      const { id } = applicationFields;
      const applicationForm = await applicationFormService.findApplicationFormById(
        id
      );
      if (applicationForm) {
        const updatedForm = await applicationFormService.updateApplicationForm(
          id,
          applicationFields
        );
        res.json({ result: updatedForm });
      } else {
        const newApplicationForm = await applicationFormService.createApplicationForm(
          applicationFields
        );
        res.json({ result: newApplicationForm });
      }
    } catch (e) {
      next(e);
    }
  }
);

//@route     DELETE api/applicationForms/
//@desc      delete applicationForms
//@access    PRIVATE
router.delete(
  "/:app_id",
  auth,
  roleCheck(["agent", "admin"]),
  async (req, res, next) => {
    const id = req.params.app_id;
    try {
      const removed = await applicationFormService.removeApplicationForm(id);
      res.json({ result: removed });
    } catch (e) {
      next(e);
    }
  }
);

exports.router = router;
