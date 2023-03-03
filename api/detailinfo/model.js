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

function allDataAdjuster(projects, tasks, resources) {
  let newProjectArray = [];

  projects.forEach((project) => {
    let newTaskArray = [];
    let newResourceArray = [];
    let totalWorking = 0;
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
    resources.forEach((resource) => {
      if (project["project_id"] === resource["project_id"]) {
        let newObj = {
          resource_id: resource["resource_id"],
          resource_name: resource["resource_name"],
          total_working_hours: resource["total_working_hours"],
        };
        newResourceArray.push(newObj);
        totalWorking = totalWorking + resource["total_working_hours"];
      }
    });
    let newProObj = {
      ...project,
      tasks: newTaskArray,
      resources: newResourceArray,
      total_working_hours: totalWorking,
    };
    newProjectArray.push(newProObj);
  });
  console.log(newProjectArray);
  return newProjectArray;
}

async function getAll() {
  let projectData = await db("projects");
  let projectTaskData = await db("tasks as t").leftJoin(
    "projects as p",
    "t.project_id",
    "p.project_id"
  );
  let projectResourceData = await db("project_resources as pr")
    .leftJoin("projects as p", "pr.project_id", "p.project_id")
    .leftJoin("resources as r", "r.resource_id", "pr.resource_id");

  let projectData2 = dataAdjuster(projectData);

  return allDataAdjuster(projectData2, projectTaskData, projectResourceData);
}

async function getById(project_id) {
  let projectData = await db("projects").where({ project_id });
  let projectTaskData = await db("tasks as t").leftJoin(
    "projects as p",
    "t.project_id",
    "p.project_id"
  );
  let projectResourceData = await db("project_resources as pr")
    .leftJoin("projects as p", "pr.project_id", "p.project_id")
    .leftJoin("resources as r", "r.resource_id", "pr.resource_id");

  let projectData2 = dataAdjuster(projectData);

  return allDataAdjuster(projectData2, projectTaskData, projectResourceData)[0];
}

module.exports = { getAll, getById };
