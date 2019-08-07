'use strict'

const {
    wrapHandlerModule
} = require('../util')

const {
    authorize
} = require('./authorize')

const handler = wrapHandlerModule(require('./handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/auth'
})

router.post('/login', handler.login)
router.post('/signup', handler.signup)
router.post('/resetpassword', handler.resetPassword)
router.use(authorize);
router.delete('/logout', handler.logout)

module.exports = router
