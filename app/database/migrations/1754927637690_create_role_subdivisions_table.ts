import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RoleSubdivisions extends BaseSchema {
  protected tableName = 'role_subdivisions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('role_id').notNullable()
      table.uuid('subdivision_id').notNullable()

      table.uuid('created_by').nullable()
      table.uuid('modified_by').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.primary(['role_id', 'subdivision_id'])

      table.foreign('role_id').references('roles.id').onDelete('CASCADE')
      table.foreign('subdivision_id').references('subdivisions.id').onDelete('CASCADE')

      table.foreign('created_by').references('users.id').onDelete('SET NULL')
      table.foreign('modified_by').references('users.id').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
