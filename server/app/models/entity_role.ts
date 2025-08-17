import Entity from '#models/entity'
import Role from '#models/role'
import User from '#models/user'

import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class EntityRole extends BaseModel {
  @column({ isPrimary: true })
  declare entityId: string

  @column({ isPrimary: true })
  declare roleId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare createdBy?: string | null

  @column()
  declare modifiedBy?: string | null

  @belongsTo(() => Entity, {
    foreignKey: 'entityId',
  })
  declare entity: BelongsTo<typeof Entity>

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'modifiedBy',
  })
  declare modifier?: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(entityRole: EntityRole) {
    // Pas d'id UUID unique ici car PK composées, donc pas nécessaire
  }
}
