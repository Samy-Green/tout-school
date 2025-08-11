import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserSubdivisions extends BaseSchema {
  protected tableName = 'user_subdivisions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('subdivision_id').notNullable()
      table.uuid('created_by').nullable()
      table.uuid('modified_by').nullable()

      table.primary(['user_id', 'subdivision_id'])

      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.foreign('subdivision_id').references('id').inTable('subdivisions').onDelete('CASCADE')

      table.foreign('created_by').references('id').inTable('users').onDelete('SET NULL')

      table.foreign('modified_by').references('id').inTable('users').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
