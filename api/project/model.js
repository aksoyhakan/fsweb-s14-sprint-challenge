// `Proje` modeli buraya
const db = require("../../data/dbConfig");

function dataAdjuster(data) {
  let newArray = [];
  data.forEach((item) => {
    let newObj = {
      ...item,
      project_completed:
        item["project_completed"] === 0 || item["project_completed"] === null
          ? false
          : true,
    };
    newArray.push(newObj);
  });
  return newArray;
}

async function getAll() {
  let projectData = await db("projects");
  return dataAdjuster(projectData);
}

async function getById(project_id) {
  let projectData = await db("projects").where({ project_id });
  return dataAdjuster(projectData)[0];
}

async function insert(project) {
  return await db("projects")
    .insert(project)
    .then((response) => getById(response[0]));
}

module.exports = { getAll, getById, insert };
