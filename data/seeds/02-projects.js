/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const projectData = [
  {
    project_name: "MCB-P3",
    project_description: "MCB-P3 description",
    project_completed: true,
  },
  {
    project_name: "ID XC3",
    project_description: "ID XC3 description",
    project_completed: false,
  },
  {
    project_name: "LX-Auto",
    project_description: "LX-Auto description",
    project_completed: false,
  },
  {
    project_name: "Equalis-TL",
    project_description: "Equalis-TL description",
  },
];
exports.seed = async function (knex) {
  return await knex("projects").insert(projectData);
};
