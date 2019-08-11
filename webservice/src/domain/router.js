'use strict'

const {
    wrapHandlerModule
} = require('../util')

const handler = wrapHandlerModule(require('./handler'))
const quizHandler = wrapHandlerModule(require('../quizzes/handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/domains'
})

router.post('/', handler.createDomain)
router.get('/menuitems', handler.getDomainMenuItems)
router.get('/:domainId', handler.showDomain)
router.get('/:domainId/quizzes/ACTIVE', quizHandler.getActiveQuizzes)
router.get('/:domainId/quizzes/UPCOMING', quizHandler.getUpcomingQuizzes)
router.get('/:domainId/quizzes/ARCHIVE', quizHandler.getArchivedQuizzes)
module.exports = router
