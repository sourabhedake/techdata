'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')

async function createQuiz({
    quizName,
    domainName,
    description

}) {
    const result = await db.domain.findOne({
        name: domainName
    })

    if (!result) {
        const domainId = util.generateRandomString(5)

        const domain1 = await db.domain.create({
            domainName,
            domainId
        })
        await db.domain.findOneAndUpdate({
            domainId
        }, {
                name: domainName,
                description: description
            }
        )
    }

    const result1 = await db.quiz.findOne({
        name: quizName
    })

    if (result1) {
        return util.httpResponse(400, {
            message: 'Quiz with this Name already exists'
        })
    }
    else {
        const quizId = util.generateRandomString(5)

        await db.quiz.create({
            quizName,
            quizId
        })

        await db.quiz.findOneAndUpdate({
            quizId: quizId
        }, {
                name: quizName,
                description: description,
                domain: domainName
            }
        )
        const a1 = await db.domain.findOneAndUpdate({
            name: domainName
        }, {
                $push: { quizId: quizId }
            }
        )

        return util.httpResponse(200, {
            message: 'Quiz created successfully'
        })
    }
}

async function addQuestion({
    quizId,
    questionText,
    choice,
    answer
}) {
    const questionId = util.generateRandomString(5)
    await db.questions.create({
        questionText,
        questionId
    })
    await db.questions.findOneAndUpdate({
        questionId
    }, {
            questionText: questionText,
            quizId: quizId,
            answer: answer,
            $push: { choice: choice.split(",") },
        }
    )
    return util.httpResponse(200, {
        message: 'Question added successfully'
    })

}

async function showAllQuizzes({

}) {
    console.log("jello");
    const result = await db.quiz.find({}, { quizId: 1, name: 1, domain: 1 })
    if (!result) {
        return util.httpResponse(400, {
            message: 'No quiz found'
        })
    }
    const resultArray = []
    for (var res of result) {
        const quizDetails = {
            quizId: res.quizId,
            quizName: res.name,
            domainName: res.domain
        }
        resultArray.push(quizDetails)
    }
    return util.httpResponse(200, {
        result: resultArray
    })

}

async function showQuiz({
    quizId
}) {
    const result = await db.quiz.findOne({ quizId: quizId });
    if (!result) {
        return util.httpResponse(400, {
            message: 'No quiz with this quizId found'
        })
    }
    else {
        const quizDetails = {
            quizName: result.name,
            domainName: result.domain
        }
        return util.httpResponse(200, {
            result: quizDetails
        })
    }
}

async function showAllDomains({

}) {
    const result = await db.domain.find({}, { domainId: 1, name: 1, description: 1 })
    if (!result) {
        return util.httpResponse(400, {
            message: 'No Domains found'
        })
    }
    const resultArray = []
    for (var res of result) {
        const domainDetails = {
            domainId: res.domainId,
            domainName: res.name,
            description: res.description
        }
        resultArray.push(domainDetails)
    }
    return util.httpResponse(200, {
        result: resultArray
    })

}

async function showDomain({
    domainId
}) {
    const resultArray = [];
    const result = await db.domain.findOne({ domainId: domainId });
    if (!result) {
        return util.httpResponse(400, {
            message: 'No domain with this domainId found'
        })
    }
    else {
        const domainDetails = {
            domain: result.name,
            description: result.description
        }
        resultArray.push(domainDetails);
        for (var Id of result.quizId) {
            const result1 = await db.quiz.find({ quizId: Id }, { name: 1 })
            for (var res of result1) {
                const quizDetails = {
                    quizId: Id,
                    quizName: res.name
                }
                resultArray.push(quizDetails);
            }
        }

    }
    return util.httpResponse(200, {
        result: resultArray
    })
}

async function createDomain({
    domainName,
    description

}) {
    const result = await db.domain.findOne({
        name: domainName
    })

    if (!result) {
        const domainId = util.generateRandomString(5)

        const domain1 = await db.domain.create({
            domainName,
            domainId
        })
        await db.domain.findOneAndUpdate({
            domainId
        }, {
                name: domainName,
                description: description
            }
        )
        return util.httpResponse(200, {
            message: 'Domain created successfully'
        })
    }
    else {
        return util.httpResponse(200, {
            message: 'Domain with this name exists'
        })
    }
}

async function showQuestion({
    questionId
}) {
    const result = await db.questions.findOne({ questionId: questionId })
    if (!result) {
        return util.httpResponse(400, {
            message: 'No question with this questionId found'
        })
    }
    else {
        const quesDetails = {
            question: result.questionText,
            choices: result.choice,
            answer: result.answer

        }
        return util.httpResponse(200, {
            result: quesDetails
        })
    }
}

async function showAllQuestions({
    quizId
}) {
    const result = await db.questions.find({ quizId: quizId }, { questionId: 1, questionText: 1, choice: 1, answer: 1 })
    if (!result) {
        return util.httpResponse(400, {
            message: 'No Questions found'
        })
    }
    const resultArray = []
    for (var res of result) {
        const questionDetails = {
            questionId: res.questionId,
            questionText: res.questionText,
            choice: res.choice,
            answer: res.answer
        }
        resultArray.push(questionDetails)
    }
    return util.httpResponse(200, {
        result: resultArray
    })

}

module.exports = {
    createQuiz,
    addQuestion,
    showAllQuizzes,
    showQuiz,
    showAllDomains,
    showDomain,
    createDomain,
    showQuestion,
    showAllQuestions
}