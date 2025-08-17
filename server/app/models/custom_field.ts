//Champs personalisés pour les utilisateurs

import User from '#models/user'

import { UserType } from '#types/users'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  IMAGE = 'image',
  FILE = 'file',
  SELECT = 'select',
}

export default class CustomField extends BaseModel {
  @column({ isPrimary: true })
  declare id: string // UUID

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description?: string

  @column()
  declare type: FieldType

  @column()
  declare userType: UserType

  // Extensions acceptées, séparées par virgule, ex: "pdf,jpg,png"
  @column()
  declare allowedExtensions?: string | null

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare options: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare createdBy?: number | null

  @column()
  declare modifiedBy?: number | null

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'modifiedBy',
  })
  declare modifier?: BelongsTo<typeof User>

  @beforeCreate()
  static async assignUuid(field: CustomField) {
    if (!field.id) {
      field.id = uuidv4()
    }
  }
}
