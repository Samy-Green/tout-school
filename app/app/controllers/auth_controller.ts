import type { HttpContext } from '@adonisjs/core/http'

import Role from '#models/role'
import User from '#models/user'
import { registerValidator } from '#validators/register_validator'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async index({ inertia, response, session }: HttpContext) {
    // Récupération du rôle superadmin
    const superAdminRole = await Role.findBy('code', 'SA')

    let hasSuperAdmin = false

    if (superAdminRole) {
      // Vérifie si au moins un utilisateur possède ce rôle
      const count = await User.query()
        .whereHas('roles', (query) => {
          query.where('roles.id', superAdminRole.id)
        })
        .count('* as total')

      hasSuperAdmin = Number(count[0].$extras.total) > 0
    }

    if (hasSuperAdmin) {
      return inertia.render('auth/login', {
        title: 'Login',
        description: 'Please login to access your account.',
        //flash: session.flashMessages,
      })
    } else {
      // Redirige vers une page d'initialisation

      response.redirect().toRoute('initialize')
    }
  }

  public async initialize({ inertia, response }: HttpContext) {
    // Récupération du rôle superadmin
    const superAdminRole = await Role.findBy('code', 'SA')

    let hasSuperAdmin = false

    if (superAdminRole) {
      // Vérifie si au moins un utilisateur possède ce rôle
      const count = await User.query()
        .whereHas('roles', (query) => {
          query.where('roles.id', superAdminRole.id)
        })
        .count('* as total')

      hasSuperAdmin = Number(count[0].$extras.total) > 0
    }

    if (hasSuperAdmin) {
      response.redirect().toRoute('auth.login')
    } else {
      // Redirige vers une page d'initialisation
      return inertia.render('initialize/create_account', {
        title: 'Initialisation du compte superadmin',
        description: 'Créez le premier compte superadmin.',
        appName: 'Tout School',
        appLogo: '/images/logo.png',
      })
    }
  }

  public async register({ request, response, session }: HttpContext) {
    //await wait(1000) // Simule un délai pour l'initialisation
    // Valide les données reçues via Vine
    const data = await request.validateUsing(registerValidator)

    // Vérifie unicité du login
    const existingLogin = await User.query().where('login', data.login).first()
    if (existingLogin) {
      return response.badRequest({ error: 'Ce login est déjà utilisé.' })
    }

    // Vérifie unicité de l'email
    const existingEmail = await User.query().where('email', data.email).first()
    if (existingEmail) {
      return response.badRequest({ error: 'Cet email est déjà utilisé.' })
    }

    // Crée le nouvel utilisateur
    const user = await User.create({
      login: data.login,
      lastName: data.last_name,
      firstName: data.first_name,
      email: data.email,
      phone: data.phone,
      password: await hash.make(data.password),
    })

    // Récupère le rôle Super Admin
    const superAdminRole = await Role.findBy('code', 'SA')
    if (superAdminRole) {
      await user.related('roles').attach([superAdminRole.id])
    }

    session.flash({ success: 'Utilisateur créé avec succès !' })

    return response.redirect().toRoute('auth.login')
    // return response.created({ success: true, message: 'Super Admin créé avec succès', user })
    // return response.redirect().toRoute('auth.login')
  }
}
