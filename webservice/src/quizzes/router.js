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
router.get('/ACTIVE', handler.getActiveQuizzes)
router.get('/UPCOMING', handler.getUpcomingQuizzes)
router.get('/ARCHIVE', handler.getActiveQuizzes)
router.get('/:quizId', handler.showQuiz)
router.post('/:quizId/start', handler.startQuiz)
router.get('/:quizId/hoF',handler.hoF)
module.exports = router