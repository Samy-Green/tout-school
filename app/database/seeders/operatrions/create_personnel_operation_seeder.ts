import Operation from '#models/operation'
import Role from '#models/role'
import RoleOperation from '#models/role_operation'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class InitialSeeder extends BaseSeeder {
  public async run() {
    const systemUserId = env.get('SYSTEM_USER_ID') // UUID statique

    // Crée ou met à jour l’opération "Personnel"
    const operation = await Operation.updateOrCreate(
      { code: 'PERS' },
      {
        name: 'Personnel',
        code: 'PERS',
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canExecute: false,
        createdBy: systemUserId,
        modifiedBy: systemUserId,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      }
    )

    // Recherche le rôle "Super Admin" existant
    const role = await Role.query().where('code', 'SA').first()

    if (!role) {
      throw new Error(
        'Le rôle Super Admin (code SA) est introuvable. Merci de le créer avant de lancer ce seed.'
      )
    }

    // Lie le rôle "Super Admin" à l’opération "Personnel" avec droits
    await RoleOperation.updateOrCreate(
      { roleId: role.id, entityId: operation.id },
      {
        canRead: true,
        canCreate: true,
        canUpdate: true,
        canDelete: true,
        canExecute: false,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      }
    )
  }
}
