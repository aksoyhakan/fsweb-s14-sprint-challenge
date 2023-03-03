// `Resource` modeli buraya
const db = require("../../data/dbConfig");

async function getAll() {
  return await db("resources");
}

async function getById(resource_id) {
  return await db("resources").where({ resource_id }).first();
}

async function insert(resource) {
  return await db("resources")
    .insert(resource)
    .then((response) => getById(response[0]));
}

module.exports = { getAll, getById, insert };
