import { BaseSchema } from '@adonisjs/lucid/schema'

export default class EntityRoles extends BaseSchema {
  protected tableName = 'entity_roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('entity_id').notNullable()
      table.uuid('role_id').notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.uuid('created_by').nullable()
      table.uuid('modified_by').nullable()

      table.primary(['entity_id', 'role_id'])

      table.foreign('entity_id').references('entities.id').onDelete('CASCADE')
      table.foreign('role_id').references('roles.id').onDelete('CASCADE')
      table.foreign('created_by').references('users.id').onDelete('SET NULL')
      table.foreign('modified_by').references('users.id').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
