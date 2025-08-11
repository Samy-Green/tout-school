//Modèle d'utilisateur
// Ce modèle représente à la fois les utilisateurs du systèmes, les élèves et les membres du personnel.

import StudentParent from '#models/student_parent'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['login'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare login: string

  @column()
  declare lastName: string

  @column()
  declare firstName: string

  @column()
  declare email?: string | null

  @column()
  declare phone?: string | null

  @column({ serializeAs: null })
  declare password?: string

  @column()
  declare image?: string

  @column()
  declare gender?: 'Male' | 'Female'

  @column.date()
  declare birthDate?: DateTime

  @column()
  declare birthPlace?: string

  @column()
  declare matricule?: string | null

  @column()
  declare hasAccount: boolean

  @column()
  declare isVisible: boolean

  /**
   * Relation vers les parents/tuteurs de cet étudiant
   */
  @hasMany(() => StudentParent, {
    foreignKey: 'studentId',
  })
  declare parentRelations: HasMany<typeof StudentParent>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare deletedAt?: DateTime | null

  @column()
  declare createdBy?: string | null

  @column()
  declare modifiedBy?: string | null

  @column()
  declare deletedBy?: string | null

  @column()
  declare suspendedBy?: string | null

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare creator?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'deletedBy',
  })
  declare deleter?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'modifiedBy',
  })
  declare modifier?: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'suspendedBy',
  })
  declare suspender?: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(user: User) {
    if (!user.id) {
      user.id = uuidv4()
    }
  }
}
