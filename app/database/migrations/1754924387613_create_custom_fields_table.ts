import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CustomFields extends BaseSchema {
  protected tableName = 'custom_fields'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Primary key
      table.uuid('id').primary()

      // Informations principales
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('description').nullable()

      // Enums
      table.enu('type', ['text', 'number', 'image', 'file', 'select']).notNullable()
      table
        .enu('user_type', [
          'admin',
          'personnel',
          'superadmin',
          'student',
          'teacher',
          'guest',
          'parent',
          'all',
          'none',
        ])
        .notNullable()

      // Extensions autorisées
      table.string('allowed_extensions').nullable()

      // Options en JSON string
      table.text('options').notNullable()

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Clés étrangères
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
