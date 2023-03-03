const ResourceModels = require("./model");
const db = require("../../data/dbConfig");

function checkIdExisting(req, res, next) {
  ResourceModels.getById(req.params.id).then((response) =>
    response
      ? next()
      : next({ code: 404, message: `id no: ${req.params.id} is not found` })
  );
}

async function checkPayload(req, res, next) {
  const { resource_name } = req.body;
  !resource_name && next({ code: 405, message: `resource name is obligatory` });
  let searchedResource = await db("resources").where({ resource_name }).first();

  searchedResource
    ? next({ code: 402, message: `${resource_name} is already used` })
    : next();
}

module.exports = { checkIdExisting, checkPayload };
