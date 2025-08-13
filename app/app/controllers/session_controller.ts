import User from '#models/user'
import { loginValidator } from '#validators/login_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const data = await request.validateUsing(loginValidator)

    const { login, password } = data

    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(login, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect('/')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect('/auth/login')
  }
}
