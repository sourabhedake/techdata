'use strict'

const {
    wrapHandlerModule
} = require('../util')

const handler = wrapHandlerModule(require('./handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/quizzes'
})

router.post('/', handler.createQuiz)
router.get('/', handler.showAllQuizzes)
router.post('/:quizId/schedule', handler.scheduleQuiz)
router.get('/:quizId', handler.showQuiz)
router.get('/:quizId/active', handler.getActiveQuizzes)
router.get('/:quizId/upcoming', handler.getUpcomingQuizzes)
router.post('/:quizId/start', handler.startQuiz)

module.exports = router