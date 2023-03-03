// `/api/tasks` router buraya
const TaskModels = require("./model");
const express = require("express");
const md = require("./middleware");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res, next) => {
  TaskModels.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.get("/:id", (req, res, next) => {
  TaskModels.getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.post("/", md.checkPayload, (req, res, next) => {
  TaskModels.insert(req.taskData)
    .then((response) => res.status(201).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
