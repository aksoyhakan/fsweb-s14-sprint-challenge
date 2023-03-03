/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const resourceData = [
  { resource_name: "Lathe machine", resource_description: "CNC lathe machine" },
  {
    resource_name: "Milling machine",
    resource_description: "CNC milling machine",
  },
  {
    resource_name: "Wire-erosion machine",
    resource_description: "CNC Wire-erosion machine",
  },
  {
    resource_name: "MIG Welding machine",
    resource_description: "Robot MIG Welding machine",
  },
  {
    resource_name: "Maintenance experts",
    resource_description: "opertor who are responsible for maintenance",
  },
];
exports.seed = async function (knex) {
  return await knex("resources").insert(resourceData);
};
