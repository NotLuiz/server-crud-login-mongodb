const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const projectModel = require("../models/project.model");
const taskModel = require("../models/task.model");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const projects = await projectModel.find().populate("user");
    return res.send({ projects });
  } catch (error) {
    return res.status(400).send({ error: "Error loading projects" });
  }
});

router.get("/:projectId", async (req, res) => {
  try {
    const project = await projectModel
      .findById(req.params.projectId)
      .populate("user");
    return res.send({ project });
  } catch (error) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await projectModel.create({
      ...req.body,
      user: req.userId,
    });

    return res.send({ project });
  } catch (error) {
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/:projectId", async (req, res) => {
  res.send({ user: req.userId });
});

router.delete("/:projectId", async (req, res) => {
  try {
    await projectModel.findByIdAndRemove(req.params.projectId);
    return res.send();
  } catch (error) {
    return res.status(400).send({ error: "Error deleting project" });
  }
});

module.exports = (app) => app.use("/projects", router);
