import { Router } from 'express'

import { signIn, newToken, checkUserInfo, CrudUser } from './auth.controller'

const routes = Router()


routes
    .route('/signin')
    .post(signIn)

routes
    .route('/register')
    .post(checkUserInfo, CrudUser.createOne)

routes
    .route('/newtoken')
    .get(newToken)

export default routes