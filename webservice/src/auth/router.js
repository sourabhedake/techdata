'use strict'

const {
    wrapHandlerModule
} = require('../util')

const handler = wrapHandlerModule(require('./handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/auth'
})

router.post('/login', handler.login)
router.delete('/logout', handler.logout)
router.post('/signup', handler.signup)
router.post('/resetpassword', handler.resetPassword)
router.post('/user',handler.getUserDetails)

module.exports = router
