/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const taskData = [
  {
    task_description: "MCB P3 machine revision",
    task_notes: "All pnemautic system will be remodified",
    task_completed: true,
    project_id: 1,
  },
  {
    task_description: "Rivet machine revision",
    task_notes: "All hydraulic system will be remodified",
    task_completed: true,
    project_id: 1,
  },
  {
    task_description: "MCB P3 Final control machine revision",
    task_notes: "SCADA system will be remodified",
    task_completed: true,
    project_id: 1,
  },
  {
    task_description: "ID XC3 Hot rivet machine revision",
    task_notes: "All nipple system will be remodified",
    task_completed: true,
    project_id: 2,
  },
  {
    task_description: "ID XC3 final control machine revision",
    task_notes: "SCADA system will be remodified",
    project_id: 2,
  },
  {
    task_description: "LX-Auto Hot rivet machine revision",
    task_notes: "All nipple system will be remodified",
    project_id: 3,
  },
  {
    task_description: "LX-Auto final control machine revision",
    task_notes: "SCADA system will be remodified",
    task_completed: false,
    project_id: 3,
  },
  {
    task_description: "Equalis-TL Hot rivet machine revision",
    task_notes: "All nipple system will be remodified",
    task_completed: true,
    project_id: 4,
  },
  {
    task_description: "Equalis-TL final control machine revision",
    task_notes: "SCADA system will be remodified",
    task_completed: true,
    project_id: 4,
  },
];
exports.seed = async function (knex) {
  return await knex("tasks").insert(taskData);
};
