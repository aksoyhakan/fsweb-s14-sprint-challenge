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

module.exports = { checkIdExisting };
