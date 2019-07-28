'use strict'

const Router = require('koa-router')
const {
    authorize
} = require('../auth/authorize')

const router = new Router({
    prefix: '/admin'
})

router.use(authorize)

module.exports = router
