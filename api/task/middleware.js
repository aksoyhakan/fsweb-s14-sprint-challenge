const TaskModels = require("./model");
const db = require("../../data/dbConfig");

function checkIdExisting(req, res, next) {
  TaskModels.getById(req.params.id).then((response) =>
    response
      ? next()
      : next({
          code: 404,
          message: `id no: ${req.params.id} task is not found`,
        })
  );
}

async function checkPayload(req, res, next) {
  const { task_description, project_id } = req.body;
  !task_description &&
    next({ code: 405, message: `resource name is obligatory` });
  !project_id && next({ code: 405, message: `project id is obligatory` });
  req.taskData = {
    task_description: task_description,
    project_id: Number(project_id),
  };
  next();
}

module.exports = { checkIdExisting, checkPayload };
