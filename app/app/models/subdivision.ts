//Une subdivision représente un groupe de niveaux classe pouvant constituer un établissement (primaire/université)

import User from '#models/user'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import { v4 as uuidv4 } from 'uuid'

export default class Subdivision extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare description?: string

  @column()
  declare isVisible: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt?: DateTime | null

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
  public static assignUuid(subdivision: Subdivision) {
    if (!subdivision.id) {
      subdivision.id = uuidv4()
    }
  }
}
