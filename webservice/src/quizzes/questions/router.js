'use strict'

const {
    wrapHandlerModule
} = require('../../util')

const handler = wrapHandlerModule(require('./handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/quizzes'
})

router.post('/:quizId/questions', handler.addQuestion)
router.post('/:quizId/questions/:questionId', handler.showQuestion)
router.get('/:quizId/questions', handler.showAllQuestions)
router.post('/:quizId/nextQuestion', handler.nextQuestion)
module.exports = router
