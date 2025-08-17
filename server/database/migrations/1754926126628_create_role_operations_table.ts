import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RoleOperations extends BaseSchema {
  protected tableName = 'role_operations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clé primaire composite
      table.uuid('role_id').notNullable()
      table.uuid('entity_id').notNullable()
      table.primary(['role_id', 'entity_id'])

      // Permissions booléennes avec valeur par défaut false
      table.boolean('can_read').notNullable().defaultTo(false)
      table.boolean('can_create').notNullable().defaultTo(false)
      table.boolean('can_update').notNullable().defaultTo(false)
      table.boolean('can_delete').notNullable().defaultTo(false)
      table.boolean('can_execute').notNullable().defaultTo(false)

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      // Foreign keys
      table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE')

      table.foreign('entity_id').references('id').inTable('operations').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
