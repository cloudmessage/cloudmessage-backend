/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema
    .createTable('instances', (table) => {
      table.increments('id')
      table.string('name')
      table.string('user')
      table.string('virtual_host')
      table.string('password')
      table.string('hostname')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('instances')
};
