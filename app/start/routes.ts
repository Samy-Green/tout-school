/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import '#start/routes/auth.route'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
router.on('/').renderInertia('home').use(middleware.auth())

router.on('/test').renderInertia('test')
