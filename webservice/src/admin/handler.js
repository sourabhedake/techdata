'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')

async function scheduleQuiz(request_body, ctx) {
    const quizId = request_body.quizId;
    const startTime = request_body.startTime;
    const interval = request_body.interval;

    if (!quizId) {
        return util.httpResponse(400, {
            message: 'Insufficient Info to schedule'
        })
    }
    if (!startTime | !interval) {
        return util.httpResponse(400, {
            message: 'Insufficient Info to schedule'
        })
    }
    const result = await db.quiz.findOne({
        quizId: quizId
    })

    if (!result) {
        return util.httpResponse(400, {
            message: 'Quiz doesnt exist'
        })
    }
    await db.quiz.findOneAndUpdate({
        quizId
    }, {
            startTime: startTime,
            interval: interval
        })

    return util.httpResponse(200, {
        message: 'Schedule added successfully'
    })
}

module.exports = {
    scheduleQuiz
}

