'use strict'

const {
    wrapHandlerModule
} = require('../util')

const handler = wrapHandlerModule(require('./handler'))
const Router = require('koa-router')

const router = new Router({
    prefix: '/domain'
})

router.post('/quiz/create', handler.createQuiz)
router.get('/quiz/showAll', handler.showAllQuizzes)
router.post('/quiz/addQuestion', handler.addQuestion)
router.post('/quizId', handler.showQuiz)
router.post('/create', handler.createDomain)
router.get('/showAll', handler.showAllDomains)
router.get('/', handler.showDomain(ctx, response))
router.post('/quiz/questionId', handler.showQuestion)
router.post('/quiz/questions', handler.showAllQuestions)
router.get('/quiz/activeQuiz', handler.getActiveQuizzes)
router.get('/quiz/upcomingQuiz', handler.getUpcomingQuizzes)
router.post('/quiz/start', handler.startQuiz)
router.post('/quiz/nextQuestion',handler.nextQuestion)
module.exports = router
