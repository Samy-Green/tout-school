import Entity from '#models/entity'
import User from '#models/user'

import { UserEntityRank } from '#types/entities'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'

export default class UserEntity extends BaseModel {
  @column({ isPrimary: true })
  public userId: string

  @column({ isPrimary: true })
  public entityId: string

  @column()
  public rank: UserEntityRank = UserEntityRank.MEMBER

  @column.dateTime({ autoCreate: true })
  public createdAt: Date

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: Date

  @column()
  public createdBy?: string | null

  @column()
  public modifiedBy?: string | null

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Entity)
  public entity: BelongsTo<typeof Entity>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  public creator?: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'modifiedBy' })
  public modifier?: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(userEntity: UserEntity) {
    userEntity.id = uuidv4()
  }
}
