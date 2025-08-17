import User from '#models/user'

export class AuthService {
  static async createToken(user: User, abilities: string[] = ['*'], expiresIn: string = '1d') {
    return User.accessTokens.create(user, abilities, { expiresIn })
  }
}
