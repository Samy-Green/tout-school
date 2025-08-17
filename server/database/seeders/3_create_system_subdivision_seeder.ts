import Subdivision from '#models/subdivision'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class SubdivisionSeeder extends BaseSeeder {
  public async run() {
    const appSubdivisionId = env.get('SYSTEM_SUBDIVISION_ID') // UUID statique

    await Subdivision.updateOrCreate(
      { id: appSubdivisionId },
      {
        code: 'app-root',
        name: 'Toute l’application',
        description: 'Subdivision principale représentant l’ensemble de l’application Tout School',
        isVisible: false,

        createdBy: env.get('SYSTEM_USER_ID'), // UUID statique
        // ou l’id de l’utilisateur système si tu en as un
        modifiedBy: null,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      }
    )
  }
}
