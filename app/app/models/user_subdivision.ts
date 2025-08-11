import Subdivision from '#models/subdivision'
import User from '#models/user'

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class UserSubdivision extends BaseModel {
  @column({ isPrimary: true })
  declare userId: string

  @column({ isPrimary: true })
  declare subdivisionId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare createdBy?: string | null

  @column()
  declare modifiedBy?: string | null

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Subdivision, { foreignKey: 'subdivisionId' })
  declare subdivision: BelongsTo<typeof Subdivision>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare creator?: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'modifiedBy' })
  declare modifier?: BelongsTo<typeof User>
}
