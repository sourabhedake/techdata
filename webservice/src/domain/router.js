'use strict'

const {
    wrapHandlerModule
} = require('../util')

const handler = wrapHandlerModule(require('./handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/domains'
})

router.post('/', handler.createDomain)
router.get('/menuitems', handler.getDomainMenuItems)
router.get('/:domainId', handler.showDomain)  
router.get('/:domainId/description', handler.getInfoOfDomain)
// router.get('/:domainId/quizzes', handler.getQuizzesForDomain)
module.exports = router
