import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Entities extends BaseSchema {
  protected tableName = 'entities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clé primaire UUID
      table.uuid('id').primary()

      // Colonnes principales
      table.string('code').notNullable().unique()
      table.string('name').notNullable()
      table.string('description').nullable()

      // Relation hiérarchique
      table
        .uuid('parent_id')
        .nullable()
        .references('id')
        .inTable(this.tableName)
        .onDelete('SET NULL')

      // Type (enum en minuscules)
      table
        .enu('type', [
          'service',
          'department',
          'office',
          'direction',
          'subdirection',
          'establishment',
          'organization',
        ])
        .notNullable()

      // Métadonnées de création/modification
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
