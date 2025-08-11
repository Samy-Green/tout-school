// UserOperation model
// Représente les permissions spécifiques accordées directement à un utilisateur
// sur une entité de permission (Operation)

import Operation from '#models/operation'
import User from '#models/user'

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class UserOperation extends BaseModel {
  /**
   * ID de l'utilisateur (UUID) - fait référence à la table "users"
   */
  @column({ isPrimary: true })
  declare userId: string

  /**
   * ID de l'entité de permission (UUID) - fait référence à la table "permission_entities"
   */
  @column({ isPrimary: true })
  declare entityId: string

  /**
   * Droits/permissions accordés
   */
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

  /**
   * Relations
   */
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Operation, {
    foreignKey: 'entityId',
  })
  declare entity: BelongsTo<typeof Operation>

  /**
   * Timestamps
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
