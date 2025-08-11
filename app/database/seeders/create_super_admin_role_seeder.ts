import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    const systemUserId = 'system-user-id' // Remplacer par l’ID de vôtre utilisateur système

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
