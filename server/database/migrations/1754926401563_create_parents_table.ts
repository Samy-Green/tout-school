import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Parents extends BaseSchema {
  protected tableName = 'parents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.string('last_name').notNullable()
      table.string('first_name').notNullable()

      table.string('email').nullable().unique()
      table.string('phone').nullable().unique()
      table.string('address').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()

      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('deleted_by').nullable().references('id').inTable('users').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
