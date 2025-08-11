// StudentParent model
// Table de liaison pour gérer la relation many-to-many entre User (étudiants) et Parent
// Un étudiant peut avoir plusieurs tuteurs/parents, un parent peut avoir plusieurs enfants

import Parent from '#models/parent'
import User from '#models/user'

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export enum TutorType {
  FATHER = 'father',
  MOTHER = 'mother',
  LEGAL_TUTOR = 'legal_tutor',
  OTHER = 'other',
}

export default class StudentParent extends BaseModel {
  /**
   * ID de l'étudiant (UUID) - fait référence à la table "users"
   */
  @column({ isPrimary: true })
  declare studentId: string

  /**
   * ID du parent/tuteur (UUID) - fait référence à la table "parents"
   */
  @column({ isPrimary: true })
  declare parentId: string

  /**
   * Type de tuteur (père, mère, tuteur légal, etc.)
   */
  @column()
  declare tutorType: TutorType

  /**
   * Ordre de priorité pour les contacts (1 = priorité maximale)
   */
  @column()
  declare contactPriority: number

  /**
   * Informations supplémentaires sur la relation
   */
  @column()
  declare notes?: string | null

  /**
   * Relations
   */
  @belongsTo(() => User, {
    foreignKey: 'studentId',
  })
  declare student: BelongsTo<typeof User>

  @belongsTo(() => Parent, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Parent>

  /**
   * Audit trail
   */
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
    foreignKey: 'modifiedBy',
  })
  declare modifier?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'deletedBy',
  })
  declare deleter?: BelongsTo<typeof User>

  /**
   * Timestamps
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt?: DateTime | null
}
