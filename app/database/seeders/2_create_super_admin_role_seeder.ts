import Role from '#models/role'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    const systemUserId = env.get('SYSTEM_USER_ID') // UUID statique

    await Role.updateOrCreate(
      { code: 'SA' }, // condition unique
      {
        name: 'Super Admin',
        description: 'Rôle avec tous les privilèges et accès complets',
        code: 'SA',
        protection: 3, // Niveau de protection élevé
        count: 0,
        studentCompatibility: false,
        createdBy: systemUserId,
        modifiedBy: systemUserId,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      }
    )
  }
}
