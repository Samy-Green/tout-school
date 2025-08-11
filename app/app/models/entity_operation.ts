// EntityOperation model
// Représente les permissions qu'une entité possède sur une opération

import Entity from '#models/entity'
import Operation from '#models/operation'

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class EntityOperation extends BaseModel {
  /**
   * ID de l'entité (UUID) - fait référence à la table "entities"
   */
  @column({ isPrimary: true })
  declare entityId: string

  /**
   * ID de l'opération (UUID) - fait référence à la table "operations"
   */
  @column({ isPrimary: true })
  declare operationId: string

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
  @belongsTo(() => Entity, {
    foreignKey: 'entityId',
  })
  declare entity: BelongsTo<typeof Entity>

  @belongsTo(() => Operation, {
    foreignKey: 'operationId',
  })
  declare operation: BelongsTo<typeof Operation>

  /**
   * Timestamps
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
