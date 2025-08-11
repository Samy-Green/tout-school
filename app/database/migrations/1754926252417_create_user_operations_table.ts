import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserOperations extends BaseSchema {
  protected tableName = 'user_operations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clé primaire composite
      table.uuid('user_id').notNullable()
      table.uuid('entity_id').notNullable()
      table.primary(['user_id', 'entity_id'])

      // Permissions booléennes avec défaut false
      table.boolean('_read').notNullable().defaultTo(false)
      table.boolean('_create').notNullable().defaultTo(false)
      table.boolean('_update').notNullable().defaultTo(false)
      table.boolean('_delete').notNullable().defaultTo(false)
      table.boolean('_execute').notNullable().defaultTo(false)

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Foreign keys
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.foreign('entity_id').references('id').inTable('operations').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
