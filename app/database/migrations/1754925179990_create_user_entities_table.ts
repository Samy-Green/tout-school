import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserEntities extends BaseSchema {
  protected tableName = 'user_entities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clé primaire composite
      table.uuid('user_id').notNullable()
      table.uuid('entity_id').notNullable()
      table.primary(['user_id', 'entity_id'])

      // Rang avec valeur par défaut 3 (MEMBER)
      table.integer('rank').notNullable().defaultTo(3)

      // Métadonnées
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      // Foreign keys
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.foreign('entity_id').references('id').inTable('entities').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
