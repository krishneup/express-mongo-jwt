import { Router } from 'express'
import {CrudUser } from './user.controller'

const {
    verifyAccessToken
} = require('../../utils/auth')

const routes = Router()


routes
    .route('/')
    .get(verifyAccessToken, CrudUser.getMany)
    // .post(checkUserInfo, CrudUser.createOne)

routes
    .route('/:id')
    .get(CrudUser.getOne)


export default routes;