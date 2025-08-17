//Association entre utilisateus et champs personalisés (valeur des champs donc)
//
import CustomField from '#models/custom_field'
import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class UserCustomField extends BaseModel {
  @column({ isPrimary: true })
  declare userId: string // UUID (clé étrangère)

  @column({ isPrimary: true })
  declare customFieldId: string // UUID (clé étrangère)

  @column()
  declare value: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => CustomField)
  declare customField: BelongsTo<typeof CustomField>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
