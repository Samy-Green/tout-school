// RoleOperation model
// Représente les permissions qu'un rôle possède sur une entité de permission (Operation)

import Operation from '#models/operation'
import Role from '#models/role'

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class RoleOperation extends BaseModel {
  /**
   * ID du rôle (UUID) - fait référence à la table "roles"
   */
  @column({ isPrimary: true })
  declare roleId: string

  /**
   * ID de l'entité de permission (UUID) - fait référence à la table "permission_entities"
   */
  @column({ isPrimary: true })
  declare entityId: string

  /**
   * Droits/permissions accordés
   */
  @column()
  declare canRead: boolean

  @column()
  declare canCreate: boolean

  @column()
  declare canUpdate: boolean

  @column()
  declare canDelete: boolean

  @column()
  declare canExecute: boolean

  /**
   * Relations
   */
  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>

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
