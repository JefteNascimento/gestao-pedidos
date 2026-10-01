/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

  router.post('/clientes', [controllers.Clientes, 'store'])
  router.get('/clientes', [controllers.Clientes, 'index'])
  router.put('/clientes/:id', [controllers.Clientes, 'update'])

  router.post('/produtos', [controllers.Produtos, 'store'])
  router.get('/produtos', [controllers.Produtos, 'index'])
  router.put('/produtos/:id', [controllers.Produtos, 'update'])
  router.patch('/produtos/:id/status', [controllers.Produtos, 'alterarStatus'])

  router.post('/pedidos', [controllers.Pedidos, 'store']);
  router.get('/pedidos', [controllers.Pedidos, 'index']);
  router.get('/pedidos/:id', [controllers.Pedidos, 'show']);
  router.patch('/pedidos/:id/status', [controllers.Pedidos, 'alterarStatus']);