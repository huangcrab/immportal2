"use strict";

const express = require("express");
const router = express.Router();

const applicationService = require("./applicationService");
const roleCheck = require("../../middleware/roleCheck");
const auth = require("../../middleware/auth");

//@route     GET api/applications/
//@desc      get current users applications
//@access    PRIVATE
router.get("/", auth, async (req, res, next) => {
  try {
    const errs = {};
    const { role } = req.user;
    let applications;
    if (role === "vip") {
      applications = await applicationService.findApplicationsByUserId(
        req.user.id
      );
    } else {
      applications = await applicationService.findAllApplications();
    }

    if (applications.length === 0) {
      errs.noprofile = "There is no applications";
      return res.status(404).json(errs);
    }
    res.json({ result: applications });
  } catch (e) {
    next(e);
  }
});

//@route     GET api/applications/:app_id
//@desc      get users application by id
//@access    PRIVATE
router.get("/:app_id", auth, async (req, res, next) => {
  try {
    const errs = {};
    const { id, role } = req.user;
    const application = await applicationService.findApplicationById(
      req.params.app_id
    );
    if (application) {
      if (id !== application.user.toString() && role === "vip") {
        res.status(401).json({
          message: "You are not authoraized to view this application"
        });
      }
      res.json({ result: application });
    } else {
      res.status(404).json({ message: "Application Not Found" });
    }
  } catch (e) {
    next(e);
  }
});

//@route     POST api/applications/
//@desc      create/update applications
//@access    PRIVATE
router.post("/", auth, async (req, res, next) => {
  try {
    const errs = {};
    const { role } = req.user;
    const applicationFields = req.body;
    let applications;

    applications = await applicationService.findApplicationsByUserId(
      req.user.id
    );

    // if (applications.length === 0) {
    //   errs.noprofile = "There is no applications for this user";
    //   return res.status(404).json(errs);
    // }

    if (
      applications
        .map(application => application._id.toString())
        .indexOf(applicationFields.id) !== -1 ||
      role === "agent"
    ) {
      console.log("tet");
      //FOUND - UPDATE
      const updatedApplication = await applicationService.updateApplication(
        applicationFields._id,
        applicationFields
      );
      res.json({ result: updatedApplication });
    } else {
      delete applicationFields.id;
      applicationFields.user = req.user.id;
      const newApplication = await applicationService.createApplication(
        applicationFields
      );
      res.json({ result: newApplication });
    }
  } catch (e) {
    next(e);
  }
});

//@route     DELETE api/application/
//@desc      delete application
//@access    PRIVATE
router.delete("/:app_id", auth, async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const appId = req.params.app_id;
    const application = await applicationService.findApplicationById(appId);

    if (application.user === id || role === "agent" || role === "admin") {
      const removed = await applicationFormService.removeApplicationForm(appId);
      res.json({ result: removed });
    }
  } catch (e) {
    next(e);
  }
});

exports.router = router;
