import Entity from '#models/entity'
import User from '#models/user'

import { UserEntityRank } from '#types/entities'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class UserEntity extends BaseModel {
  @column({ isPrimary: true })
  declare userId: string

  @column({ isPrimary: true })
  declare entityId: string

  @column()
  declare rank: UserEntityRank

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare createdBy?: string | null

  @column()
  declare modifiedBy?: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Entity)
  declare entity: BelongsTo<typeof Entity>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare creator?: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'modifiedBy' })
  declare modifier?: BelongsTo<typeof User>
}
