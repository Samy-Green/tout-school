import Role from '#models/role'
import User from '#models/user'
import { AuthService } from '#services/auth/auth_service'
import { ResponseService } from '#services/responses/response_service'
import { loginValidator } from '#validators/login_validator'
import { registerValidator } from '#validators/register_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Vérifie si un super admin existe, sinon redirige vers l'initialisation
   */
  public async index({ response }: HttpContext) {
    try {
      const superAdminRole = await Role.findBy('code', 'SA')

      let hasSuperAdmin = false
      if (superAdminRole) {
        const count = await User.query()
          .whereHas('roles', (query) => {
            query.where('roles.id', superAdminRole.id)
          })
          .count('* as total')

        hasSuperAdmin = Number(count[0].$extras.total) > 0
      }

      return response.ok(
        ResponseService.formatResponse(
          true,
          {
            hasSuperAdmin,
            message: hasSuperAdmin
              ? 'Super admin existe déjà, utilisez /login pour vous connecter'
              : 'Aucun super admin, utilisez /register pour créer le premier',
          },
          null
        )
      )
    } catch (error) {
      return response.internalServerError(
        ResponseService.formatResponse(false, null, {
          code: 'SERVER_ERROR',
          message: 'Erreur lors de la vérification du super admin',
        })
      )
    }
  }

  /**
   * Création du premier compte super admin
   */
  public async register({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(registerValidator)

      // Vérifie unicité du login
      const existingLogin = await User.query().where('login', data.login).first()
      if (existingLogin) {
        return response.badRequest(
          ResponseService.formatResponse(false, null, {
            code: 'LOGIN_EXISTS',
            message: 'Ce login est déjà utilisé.',
          })
        )
      }

      // Vérifie unicité de l'email
      const existingEmail = await User.query().where('email', data.email).first()
      if (existingEmail) {
        return response.badRequest(
          ResponseService.formatResponse(false, null, {
            code: 'EMAIL_EXISTS',
            message: 'Cet email est déjà utilisé.',
          })
        )
      }

      // Crée l'utilisateur
      const user = await User.create({
        login: data.login,
        lastName: data.last_name,
        firstName: data.first_name,
        hasAccount: true,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })

      // Ajoute le rôle Super Admin
      const superAdminRole = await Role.findBy('code', 'SA')
      if (superAdminRole) {
        await user.related('roles').attach([superAdminRole.id])
      }

      return response.created(
        ResponseService.formatResponse(
          true,
          {
            user,
            message: 'Super Admin créé avec succès',
          },
          null
        )
      )
    } catch (error) {
      return response.internalServerError(
        ResponseService.formatResponse(false, null, {
          code: 'REGISTRATION_FAILED',
          message: 'Échec de la création du compte',
        })
      )
    }
  }

  /**
   * Connexion + génération du token
   */
  public async login({ request, response }: HttpContext) {
    try {
      const { login, password, remember } = await request.validateUsing(loginValidator)

      // Vérifie les credentials
      try {
        const user = await User.verifyCredentials(login, password)

        try {
          if (!user.hasAccount) {
            return response.unauthorized(
              ResponseService.formatResponse(false, null, {
                code: 'NO_ACCOUNT',
                message: 'Compte non activé',
              })
            )
          }

          const expiresIn = remember ? '30d' : '1h'
          const token = await AuthService.createToken(user, ['*'], expiresIn)

          return response.ok(
            ResponseService.formatResponse(
              true,
              {
                user,
                token: token.value!.release(),
              },
              null
            )
          )
        } catch (error) {
          return response.internalServerError(
            ResponseService.formatResponse(false, null, {
              code: 'LOGIN_FAILED',
              message: 'Échec de la connexion',
            })
          )
        }
      } catch (error) {
        console.log(error)
        return response.unauthorized(
          ResponseService.formatResponse(false, null, {
            code: 'INVALID_CREDENTIALS',
            message: 'Identifiants invalides',
          })
        )
      }
    } catch (error) {
      return response.internalServerError(
        ResponseService.formatResponse(false, null, {
          code: 'LOGIN_FAILED',
          message: 'Échec de la connexion',
        })
      )
    }
  }

  /**
   * Déconnexion = suppression du token courant
   */
  public async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.user
      const currentToken = auth.user?.currentAccessToken

      if (user && currentToken) {
        await User.accessTokens.delete(user, currentToken.identifier)
      }

      return response.ok(
        ResponseService.formatResponse(true, { message: 'Déconnecté avec succès' }, null)
      )
    } catch (error) {
      return response.internalServerError(
        ResponseService.formatResponse(false, null, {
          code: 'LOGOUT_FAILED',
          message: 'Échec de la déconnexion',
        })
      )
    }
  }

  /**
   * Exemple d'une route protégée
   */
  public async me({ auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      return response.ok(ResponseService.formatResponse(true, auth.user, null))
    } catch (error) {
      return response.unauthorized(
        ResponseService.formatResponse(false, null, {
          code: 'UNAUTHORIZED',
          message: 'Non authentifié',
        })
      )
    }
  }
}
