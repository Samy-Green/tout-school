// AuditLog model
// Historique des actions effectuées sur la plateforme

import User from '#models/user'

import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class AuditLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId?: string | null

  @column()
  declare entity: string

  @column()
  declare entityId?: string | null

  @column()
  declare operation: string

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare requiredRights: string[]

  @column()
  declare summary?: string

  @column()
  declare oldValue?: string

  @column()
  declare newValue?: string

  @column()
  declare ipAddress?: string

  @column()
  declare userAgent?: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(log: AuditLog) {
    log.id = uuidv4()
  }
}
