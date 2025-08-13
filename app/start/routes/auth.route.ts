const SessionController = () => import('#controllers/session_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
router
  .group(() => {
    router.get('/login', [AuthController, 'index']).as('auth.login')
    router.post('/login', [SessionController, 'store']).as('auth.login.store')

    router.post('/register', [AuthController, 'register']).as('auth.register')

    router.post('/logout', [SessionController, 'destroy']).as('auth.logout')
  })
  .prefix('/auth')

router.get('/initialize', [AuthController, 'initialize']).as('initialize')
