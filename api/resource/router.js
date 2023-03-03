// `/api/resources` router buraya
const ResourceModels = require("./model");
const express = require("express");
const md = require("./middleware");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res, next) => {
  ResourceModels.getAll()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.get("/:id", md.checkIdExisting, (req, res, next) => {
  ResourceModels.getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.post("/", md.checkPayload, (req, res, next) => {
  ResourceModels.insert(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
