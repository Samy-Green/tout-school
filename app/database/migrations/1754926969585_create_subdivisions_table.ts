import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Subdivisions extends BaseSchema {
  protected tableName = 'subdivisions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('code').notNullable().unique()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.boolean('is_visible').notNullable().defaultTo(true)

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('deleted_by').nullable().references('id').inTable('users').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
