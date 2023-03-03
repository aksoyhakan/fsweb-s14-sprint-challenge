const ProjectModels = require("./model");

function checkIdExisting(req, res, next) {
  ProjectModels.getById(req.params.id).then((response) => {
    response
      ? next()
      : next({
          code: 404,
          message: `id no: ${req.params.id} project not found`,
        });
  });
}

function payloadCheck(req, res, next) {
  const { project_name } = req.body;
  project_name
    ? next()
    : next({ code: 401, message: "projectname is obligatory" });
}

module.exports = { checkIdExisting, payloadCheck };
