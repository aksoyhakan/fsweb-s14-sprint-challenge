// bu`Task` modeli buraya
const db = require("../../data/dbConfig");

function dataAdjuster(data) {
  let newArray = [];
  data.forEach((item) => {
    let newObj = {
      ...item,
      task_completed:
        item["task_completed"] === 0 || item["task_completed"] === null
          ? false
          : true,
    };
    newArray.push(newObj);
  });
  return newArray;
}

async function getAll() {
  let taskData = await db("tasks")
    .leftJoin("projects", "tasks.project_id", "projects.project_id")
    .select("tasks.*", "projects.project_name", "projects.project_description");
  return dataAdjuster(taskData);
}

async function getById(task_id) {
  let taskData = await db("tasks")
    .leftJoin("projects", "tasks.project_id", "projects.project_id")
    .select("tasks.*", "projects.project_name", "projects.project_description")
    .where({ task_id });
  return dataAdjuster(taskData)[0];
}

async function insert(task) {
  return await db("tasks")
    .insert(task)
    .then((response) => getById(response[0]));
}

module.exports = { getAll, getById, insert };
