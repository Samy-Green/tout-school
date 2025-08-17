// Role model
// Représente un rôle dans le système, pouvant être lié à des utilisateurs
// et possédant des informations sur la protection, la compatibilité, etc.

import User from '#models/user'

import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Role extends BaseModel {
  // Identifiant unique au format UUID
  @column({ isPrimary: true })
  declare id: string

  // Nom du rôle
  @column()
  declare name: string

  // Description (optionnelle)
  @column()
  declare description?: string | null

  // Code du rôle (8 caractères)
  @column()
  declare code: string

  // Protection du rôle (0 = aucune, autre valeur selon règles)
  @column()
  declare protection: number

  // Nombre d'utilisateurs liés à ce rôle
  @column()
  declare count: number

  // Compatibilité avec les étudiants (boolean)
  @column()
  declare studentCompatibility: boolean

  // Créé par (FK vers User)
  @column()
  declare createdBy?: string | null

  // Modifié par (FK vers User)
  @column()
  declare modifiedBy?: string | null

  // Relation : créateur du rôle
  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator?: BelongsTo<typeof User>

  // Relation : dernière personne à avoir modifié le rôle
  @belongsTo(() => User, {
    foreignKey: 'modifiedBy',
  })
  declare modifier?: BelongsTo<typeof User>

  // Timestamps
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Génération UUID avant création
  @beforeCreate()
  public static assignUuid(role: Role) {
    if (!role.id) {
      role.id = uuidv4()
    }
  }
}
