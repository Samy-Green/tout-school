import User from '#models/user'
import { EntityType } from '#types/entities'

import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Entity extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare description?: string

  @column()
  declare parentId?: string | null

  @belongsTo(() => Entity, { foreignKey: 'parentId' })
  declare parent?: BelongsTo<typeof Entity>

  @column()
  declare type: EntityType

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(entity: Entity) {
    if (!entity.id) {
      entity.id = uuidv4()
    }
  }
}
