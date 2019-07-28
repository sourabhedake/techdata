'use strict'

const {
    wrapHandlerModule
} = require('../util')

const handler = wrapHandlerModule(require('./handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/auth'
})

router.post('/signin', handler.signin)
router.post('/signup', handler.signup)
router.post('/resetpassword', handler.resetPassword)

module.exports = router
