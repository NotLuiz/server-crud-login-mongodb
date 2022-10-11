const express = require("express");
const router = express.Router();
const userModel = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    return res.send({ users });
  } catch (error) {
    return res.status(400).send({ error: "Error find users" });
  }
});

module.exports = (app) => app.use("/users", router);
