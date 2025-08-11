import Entity from '#models/entity'
import Subdivision from '#models/subdivision'
import User from '#models/user'

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class EntitySubdivision extends BaseModel {
  @column({ isPrimary: true })
  declare entityId: string

  @column({ isPrimary: true })
  declare subdivisionId: string

  @column()
  declare createdBy?: string | null

  @column()
  declare modifiedBy?: string | null

  @belongsTo(() => Entity, {
    foreignKey: 'entityId',
  })
  declare entity: BelongsTo<typeof Entity>

  @belongsTo(() => Subdivision, {
    foreignKey: 'subdivisionId',
  })
  declare subdivision: BelongsTo<typeof Subdivision>

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
}
