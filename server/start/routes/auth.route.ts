const AuthController = () => import('#controllers/auth_controller')

import router from '@adonisjs/core/services/router'
router
  .group(() => {
    router.get('/index', [AuthController, 'index']).as('auth.index')

    router.post('/login', [AuthController, 'login']).as('auth.login')

    router.post('/register', [AuthController, 'register']).as('auth.register')

    router.post('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .prefix('/auth')
