'use strict'
const Router = require('koa-router')
const _ = require('ramda')
const router = new Router()

const authRoutes = require('./auth/router')
const adminRoutes = require('./admin/router')

router.use(authRoutes.routes(), authRoutes.allowedMethods())
router.use(adminRoutes.routes(), adminRoutes.allowedMethods())

module.exports = router