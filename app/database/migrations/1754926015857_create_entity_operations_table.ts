import { BaseSchema } from '@adonisjs/lucid/schema'

export default class EntityOperations extends BaseSchema {
  protected tableName = 'entity_operations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clé primaire composite
      table.uuid('entity_id').notNullable()
      table.uuid('operation_id').notNullable()
      table.primary(['entity_id', 'operation_id'])

      // Permissions avec défaut false
      table.boolean('can_read').notNullable().defaultTo(false)
      table.boolean('can_create').notNullable().defaultTo(false)
      table.boolean('can_update').notNullable().defaultTo(false)
      table.boolean('can_delete').notNullable().defaultTo(false)
      table.boolean('can_execute').notNullable().defaultTo(false)

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Foreign keys
      table.foreign('entity_id').references('id').inTable('entities').onDelete('CASCADE')

      table.foreign('operation_id').references('id').inTable('operations').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
