import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserCustomFields extends BaseSchema {
  protected tableName = 'user_custom_fields'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').notNullable()
      table.uuid('custom_field_id').notNullable()
      table.string('value').notNullable()

      // Clé primaire composite
      table.primary(['user_id', 'custom_field_id'])

      // Foreign keys
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.foreign('custom_field_id').references('id').inTable('custom_fields').onDelete('CASCADE')

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
