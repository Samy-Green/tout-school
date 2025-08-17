import StudentParent from '#models/student_parent'
import User from '#models/user'

import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import { v4 as uuidv4 } from 'uuid'

export default class Parent extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare lastName: string

  @column()
  declare firstName: string

  @column()
  declare email?: string | null

  @column()
  declare phone?: string | null

  @column()
  declare address?: string | null

  /**
   * Relation vers les étudiants dont ce parent est tuteur
   */
  @hasMany(() => StudentParent, {
    foreignKey: 'parentId',
  })
  declare studentRelations: HasMany<typeof StudentParent>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare createdBy?: string | null

  @column()
  declare modifiedBy?: string | null

  @column()
  declare deletedBy?: string | null

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'deletedBy',
  })
  declare deleter?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'modifiedBy',
  })
  declare modifier?: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(parent: Parent) {
    parent.id = uuidv4()
  }
}
