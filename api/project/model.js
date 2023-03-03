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

function allDataAdjuster(projects, tasks) {
  let newProjectArray = [];

  projects.forEach((project) => {
    let newTaskArray = [];
    tasks.forEach((task) => {
      if (project["project_id"] === task["project_id"]) {
        let newObj = {
          task_id: task["task_id"],
          task_description: task["task_description"],
          task_notes: task["task_notes"],
          task_completed:
            task["task_completed"] === 0 || task["task_completed"] === null
              ? false
              : true,
        };
        newTaskArray.push(newObj);
      }
    });
    let newProObj = {
      ...project,
      tasks: newTaskArray,
    };
    newProjectArray.push(newProObj);
  });
  console.log(newProjectArray);
  return newProjectArray;
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

async function getAllInfo() {
  let projectData = await db("projects");
  let projectTaskData = await db("tasks as t").leftJoin(
    "projects as p",
    "t.project_id",
    "p.project_id"
  );

  let projectData2 = dataAdjuster(projectData);

  return allDataAdjuster(projectData2, projectTaskData);
}

module.exports = { getAll, getById, insert, getAllInfo };
