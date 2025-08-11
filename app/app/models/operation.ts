import User from '#models/user'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare exceptions?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt?: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt?: DateTime

  @column()
  declare _read: boolean

  @column()
  declare _create: boolean

  @column()
  declare _update: boolean

  @column()
  declare _delete: boolean

  @column()
  declare _execute: boolean

  @column()
  declare createdBy?: string | null

  @column()
  declare modifiedBy?: string | null

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'modifiedBy',
  })
  declare modifier?: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(operation: Operation) {
    if (!operation.id) {
      operation.id = uuidv4()
    }
  }
}
