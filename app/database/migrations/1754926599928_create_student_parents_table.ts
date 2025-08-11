import { BaseSchema } from '@adonisjs/lucid/schema'

export default class StudentParents extends BaseSchema {
  protected tableName = 'student_parent'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clé primaire composite
      table.uuid('student_id').notNullable()
      table.uuid('parent_id').notNullable()
      table.primary(['student_id', 'parent_id'])

      // Enum tutorType (stocké en string)
      table.enu('tutor_type', ['father', 'mother', 'legal_tutor', 'other']).notNullable()

      table.integer('contact_priority').notNullable()

      table.text('notes').nullable()

      // Audit trail
      table.uuid('created_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('modified_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      table.uuid('deleted_by').nullable().references('id').inTable('users').onDelete('SET NULL')

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()

      // Foreign keys
      table.foreign('student_id').references('id').inTable('users').onDelete('CASCADE')

      table.foreign('parent_id').references('id').inTable('parents').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
