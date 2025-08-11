import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'
import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class SystemUserSeeder extends BaseSeeder {
  public async run() {
    const systemUserId = env.get('SYSTEM_USER_ID') // UUID statique

    // Vérifie si l'utilisateur existe déjà pour éviter les doublons
    const existing = await User.find(systemUserId)
    if (existing) {
      console.info('System user already exists, skipping creation.')
      return
    }

    // Crée l'utilisateur système
    await User.create({
      id: systemUserId,
      login: 'system',
      lastName: 'Tout School',
      firstName: 'System',
      email: 'system@toutschool.local',
      password: await hash.make('ChangeMe#123!'), // mot de passe sécurisé, à changer
      hasAccount: false,
      isVisible: false,
      createdBy: systemUserId, // Il s'est créé lui-même
      modifiedBy: systemUserId,
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    })
  }
}
