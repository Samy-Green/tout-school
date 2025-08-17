import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AuditLogs extends BaseSchema {
  protected tableName = 'audit_logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clé primaire UUID
      table.uuid('id').primary()

      // Relation utilisateur
      table.uuid('user_id').nullable().references('id').inTable('users').onDelete('SET NULL')

      // Informations d'audit
      table.string('entity').notNullable()
      table.uuid('entity_id').nullable()
      table.string('operation').notNullable()
      table.text('required_rights').notNullable() // stocké en JSON string
      table.string('summary').nullable()
      table.text('old_value').nullable()
      table.text('new_value').nullable()
      table.string('ip_address').nullable()
      table.string('user_agent').nullable()

      // Horodatage
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
