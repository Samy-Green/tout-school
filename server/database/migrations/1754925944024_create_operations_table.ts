import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Operations extends BaseSchema {
  protected tableName = 'operations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('code').notNullable()
      table.string('name').notNullable()
      table.string('exceptions').nullable()

      table.boolean('can_read').notNullable().defaultTo(false)
      table.boolean('can_create').notNullable().defaultTo(false)
      table.boolean('can_update').notNullable().defaultTo(false)
      table.boolean('can_delete').notNullable().defaultTo(false)
      table.boolean('can_execute').notNullable().defaultTo(false)

      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
