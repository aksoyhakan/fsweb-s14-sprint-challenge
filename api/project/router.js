//  `/api/projects` router buraya
const ProjectModels = require("./model");
const md = require("./middleware");
const express = require("express");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res, next) => {
  ProjectModels.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.get("/:id", md.checkIdExisting, (req, res, next) => {
  ProjectModels.getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.post("/", md.payloadCheck, (req, res, next) => {
  ProjectModels.insert(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
