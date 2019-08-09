'use strict'

const _ = require('ramda')
const db = require('../../db')
const util = require('../../util')

async function addQuestion({
    questionText,
    choice,
    answer,
}, ctx) {
    const quizId = ctx.params.quizId;
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

async function showQuestion({
}, ctx) {
    const quizId = ctx.params.quizId;
    const questionId = ctx.params.questionId;
    const result = await db.questions.findOne({ questionId: questionId })
    if (!result) {
        return util.httpResponse(400, {
            message: 'No question with this questionId found'
        })
    }
    else {
        const result1 = await db.quiz.findOne({ quizId: result.quizId })
        if (result1) {
            var date = new Date();

            var startTime = result1.startTime;
            var activationTime = new Date(startTime);

            if (date > activationTime) {
                const quesDetails = {
                    question: result.questionText,
                    choices: result.choice
                }
                return util.httpResponse(200, {
                    result: quesDetails
                })
            }
            else {
                return util.httpResponse(200, {
                    message: 'No Questions found'
                })
            }
        }
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
}, ctx) {
    const quizId = ctx.params.quizId;
    const result = await db.questions.find({ quizId: quizId }, { startTime: 1, questionId: 1, questionText: 1, choice: 1, answer: 1 })
    if (!result) {
        return util.httpResponse(400, {
            message: 'No Questions found'
        })
    }
    var date = new Date();
    const result1 = await db.quiz.findOne({ quizId: quizId }, {
        startTime:1
    })

    var startTime = result1.startTime;
    var activationTime = new Date(startTime);
    if (date > activationTime) {
        const resultArray = []
        for (var res of result) {
            const questionDetails = {
                questionId: res.questionId,
                questionText: res.questionText,
                choice: res.choice
            }
            resultArray.push(questionDetails)
        }
        return util.httpResponse(200, {
            result: resultArray
        })
    }
    else {
        return util.httpResponse(400, {
            message: 'No Questions allowed found'
        })
    }
}

async function nextQuestion({ userId, attemptId, previousQtnId, userAnswer }, ctx) {
    const quizId = ctx.params.quizId;
    const questionStatus = false;
    const result = await db.attempt.findOne({ quizId: quizId, userId: userId, attemptId: attemptId, questionId: previousQtnId, questionStatus: questionStatus }, { _id: 1, choice: 1, answer: 1 })
    if (result) {
        console.log("Updating user's answer in attempt table ");
        const _id = result._id;
        await db.attempt.findOneAndUpdate({
            _id
        }, {
                userAnswer: userAnswer,
                questionStatus: true
            }
        )
        console.log("updated user answer");
        //fetch next question for user 
        const questionStatus = false;
        const result1 = await db.attempt.findOne({ quizId: quizId, attemptId: attemptId, userId: userId, questionStatus: questionStatus }, { questionId: 1, choice: 1 })
        if (result1) {
            const questionId = result1.questionId;

            const result2 = await db.questions.findOne({ questionId: questionId }, { questionId: 1, questionText: 1, choice: 1 });
            console.log("fetch next ques id");
            if (result2) {
                return util.httpResponse(200, {
                    data: {
                        question: {
                            questionText: result2.questionText,
                            choice: result2.choice,
                            questionId: result2.questionId,
                            attemptId: attemptId,
                        }
                    }
                });
            }
        }
        else {
            // no more unattempted qtns left -- end the quiz --put score in table 
            console.log("No more qtns to fetch");
            //get all user's answers and match 
            const result5 = await db.attempt.find({ quizId: quizId, attemptId: attemptId, userId: userId }, { userAnswer: 1, answer: 1, attemptNo: 1 })
            var score = 0;
            var totalQuestions = 0;
            var attemptNo = 0;
            if (result5) {
                for (var res1 of result5) {
                    attemptNo = res1.attemptNo;
                    totalQuestions = totalQuestions + 1;
                    if (res1.answer == res1.userAnswer) {
                        score = score + 1;
                    }
                }

                const entry1 = await db.score.create({
                    attemptId
                })

                await db.score.findOneAndUpdate({
                    attemptId
                }, {
                        userId: userId,
                        quizId: quizId,
                        attemptId: attemptId,
                        attemptNo: attemptNo,
                        totalQuestions: totalQuestions,
                        correct: score,
                        state: true
                    })

                const result9 = await db.score.findOne({ attemptId: attemptId, userId: userId, quizId: quizId }, { correct: 1, totalQuestions: 1 })
                return util.httpResponse(200, {
                    data: {
                        result: {
                            correct: result9.correct,
                            totalQuestions: result9.totalQuestions
                        }
                    }
                });
            }
        }
    }
    else {
        console.log("No more qtns to fetch");
        //get all user's answers and match 
        const result5 = await db.attempt.find({ quizId: quizId, attemptId: attemptId, userId: userId }, { userAnswer: 1, answer: 1, attemptNo: 1 })
        var score = 0;
        var totalQuestions = 0;
        var attemptNo = 0;
        if (result5) {
            for (var res1 of result5) {
                attemptNo = res1.attemptNo;
                totalQuestions = totalQuestions + 1;
                if (res1.answer == res1.userAnswer) {
                    score = score + 1;
                }
            }
            const entry1 = await db.score.create({
                attemptId
            })

            await db.score.findOneAndUpdate({
                attemptId
            }, {
                    userId: userId,
                    quizId: quizId,
                    attemptId: attemptId,
                    attemptNo: attemptNo,
                    totalQuestions: totalQuestions,
                    correct: score,
                    state: true
                })

            const result9 = await db.score.findOne({ attemptId: attemptId, userId: userId, quizId: quizId }, { correct: 1, totalQuestions: 1 })
            const resultDetails = {
                correct: result9.correct,
                totalQuestions: result9.totalQuestions
            }

            return util.httpResponse(200, {
                result: resultDetails
            })
        }
    }
}

module.exports = {
    addQuestion,
    showQuestion,
    showAllQuestions,
    nextQuestion
}
