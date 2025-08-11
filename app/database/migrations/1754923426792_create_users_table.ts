import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Primary key
      table.uuid('id').primary()

      // Informations principales
      table.string('login').notNullable().unique()
      table.string('last_name').notNullable()
      table.string('first_name').notNullable()
      table.string('email').nullable().unique()
      table.string('phone').nullable()
      table.string('password').nullable()
      table.string('image').nullable()
      table.enu('gender', ['male', 'female']).nullable()
      table.date('birth_date').nullable()
      table.string('birth_place').nullable()
      table.string('matricule').nullable().unique()
      table.boolean('has_account').notNullable().defaultTo(false)
      table.boolean('is_visible').notNullable().defaultTo(true)

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()

      // Relations internes (FK vers users.id)
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('deleted_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('suspended_by').nullable().references('id').inTable('users').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
