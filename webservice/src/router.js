'use strict'
const Router = require('koa-router')
const _ = require('ramda')
const router = new Router()


const authRoutes = require('./auth/router')
const adminRoutes = require('./admin/router')
const domainRoutes = require('./domain/router')
const quizRoutes = require('./quizzes/router')
const userRoutes = require('./users/router')
const questionRoutes = require('./quizzes/questions/router')

router.use(authRoutes.routes(), authRoutes.allowedMethods())
router.use(adminRoutes.routes(), adminRoutes.allowedMethods())
router.use(domainRoutes.routes(), domainRoutes.allowedMethods())
router.use(quizRoutes.routes(), quizRoutes.allowedMethods())
router.use(userRoutes.routes(), userRoutes.allowedMethods())
router.use(questionRoutes.routes(), questionRoutes.allowedMethods())

module.exports = router