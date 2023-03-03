/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (t) => {
      t.increments("project_id ");
      t.string("project_name").notNullable();
      t.string("project_description");
      t.boolean("project_completed").defaultTo(false);
    })
    .createTable("resources", (t) => {
      t.increments("resource_id");
      t.string("resource_name").unique().notNullable();
      t.string("resource_description");
    })
    .createTable("tasks", (t) => {
      t.increments("task_id");
      t.string("task_description").notNullable();
      t.string("task_notes");
      t.boolean("task_completed").defaultTo(false);
      t.integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("project_resources", (t) => {
      t.increments("project_resources_id");
      t.integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      t.integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      t.float("total_working_hours").unsigned().notNullable();
      t.primary(["project_id", "resource_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
