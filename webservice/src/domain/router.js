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
router.post('/domainId', handler.showDomain)
router.post('/quiz/questionId', handler.showQuestion)
router.post('/quiz/questions', handler.showAllQuestions)
module.exports = router