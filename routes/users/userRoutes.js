"use strict";

const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");

const roleCheck = require("../../middleware/roleCheck");
const { model: User } = require("./userModel");

const auth = require("../../middleware/auth");
const userService = require("./userService");
const tokenService = require("../../utils/tokenService");

//load input validation
const validateLoginInput = require("../../utils/validation/login");
const validateRegisterInput = require("../../utils/validation/register");
const validateAddAgentInput = require("../../utils/validation/addAgent");

//  POST api/users/login
//  Login User / return token
//  PUBLIC
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errs, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errs);
  }
  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      errs.email = "User not Found";
      return res.status(404).json(errs);
    }

    const isMatch = await user.comparePassword(password);

    if (isMatch) {
      //generate token
      const payload = {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        role: user.role
      };
      const token = tokenService.issueToken(payload);
      res.json({
        success: true,
        token: "Bearer " + token
      });
    } else {
      errs.password = "Password is not correct";
      return res.status(404).json(errs);
    }
  } catch (e) {
    next(e);
  }
});

//  POST api/users/register
//  Register User / return user
//  PUBLIC
router.post("/register", async (req, res) => {
  const { errs, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errs);
  }
  try {
    const user = await userService.findUserByEmail(req.body.email);

    if (user && user.password) {
      errs.email = "Email already exist";
      return res.status(400).json(errs);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        nickname: req.body.nickname,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      const response = await userService.save(newUser);
      res.json(response);
    }
  } catch (e) {
    next(e);
  }
});

//POST /users/upgradeAgent
//Upgrade from user to agent
//PRIVATE
router.post("/upgradeAgent", auth, roleCheck(["admin"]), async (req, res) => {
  const email = req.body.email;

  const { errs, isValid } = validateRegisterInput(req.body, "agent");

  if (!isValid) {
    return res.status(400).json(errs);
  }

  try {
    const user = await userService.findUserByEmail(email);

    if (user) {
      if (user.role === "vip") {
        user.role = "agent";
        const agent = await userService.save(user);
        res.json(agent);
      }
    }
  } catch (e) {
    next(e);
  }
});

exports.router = router;
