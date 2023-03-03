/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const projectResourceData = [
  { project_id: 1, resource_id: 1, total_working_hours: 4.5 },
  { project_id: 1, resource_id: 2, total_working_hours: 3 },
  { project_id: 1, resource_id: 3, total_working_hours: 2.75 },
  { project_id: 1, resource_id: 5, total_working_hours: 1.5 },
  { project_id: 2, resource_id: 2, total_working_hours: 11 },
  { project_id: 2, resource_id: 4, total_working_hours: 8 },
  { project_id: 2, resource_id: 5, total_working_hours: 7 },
  { project_id: 3, resource_id: 1, total_working_hours: 2.5 },
  { project_id: 3, resource_id: 3, total_working_hours: 6 },
  { project_id: 3, resource_id: 4, total_working_hours: 8 },
  { project_id: 4, resource_id: 1, total_working_hours: 2.5 },
  { project_id: 4, resource_id: 2, total_working_hours: 3.5 },
  { project_id: 4, resource_id: 3, total_working_hours: 4.5 },
  { project_id: 4, resource_id: 4, total_working_hours: 5.5 },
  { project_id: 4, resource_id: 5, total_working_hours: 6.5 },
];

exports.seed = async function (knex) {
  return await knex("project_resources").insert(projectResourceData);
};
