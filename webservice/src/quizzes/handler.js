'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')
const moment = require('moment');

async function scheduleQuiz({
    startTime,
    interval
}, ctx) {
    const quizId = ctx.params.quizId;
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

async function showAllQuizzes() {
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
}, ctx) {
    const quizId = ctx.params.quizId;
    const result = await db.quiz.findOne({ quizId: quizId });
    if (!result) {
        return util.httpResponse(404, {
            message: 'No quiz with this quizId found'
        })
    }
    else {
        return util.httpResponse(200, {
            quizId: result.quizId,
            name: result.name,
            domain: result.domain,
            description: result.description,
            startTime: result.startTime,
            interval: result.interval
        })
    }
}

//format to give time 2019-08-07T10:23:55.053Z
async function getActiveQuizzes() {

    const result = await db.quiz.find();

    if (!result) {
        return util.httpResponse(404, {
            data: {
                errMsg: 'No quiz found'
            }
        })
    }
    
    var date = new moment();
    const resultArray = []
    for (var res of result) {
        var startTime = res.startTime;
        var interval = res.interval;

        var activeTime = new moment(startTime);
        var startTimeC = new moment(startTime);
        startTimeC = startTimeC.add(interval, 'hours');
        
        if (date > activeTime && startTimeC > date) {
            resultArray.push({
                quizId: res.quizId,
                name: res.name,
                domain: res.domain,
                description: res.description,
                startTime: res.startTime,
                interval: res.interval,
            });
        }
    }
    if (!resultArray.length) {
        return util.httpResponse(404, {
            data: {
                errMsg: 'No quiz found'
            }
        })
    }
    return util.httpResponse(200, {
        data: resultArray
    })
}

async function getUpcomingQuizzes() {
    const result = await db.quiz.find({});
    if (!result) {
        return util.httpResponse(404, {
            data: {
                errMsg: 'No quiz found'
            }
        })
    }
    var date = new Date();
    const resultArray = []
    for (var res of result) {
        var startTime = res.startTime;
        var activationTime = new Date(startTime);
        if (date < activationTime) {
            resultArray.push({
                quizId: res.quizId,
                name: res.name,
                domain: res.domain,
                description: res.description,
            });
        }
    }
    if (!resultArray.length) {
        return util.httpResponse(404, {
            data: {
                errMsg: 'No quiz found'
            }
        })
    }
    return util.httpResponse(200, {
        data: resultArray
    })
}

//format to give time 2019-08-07T10:23:55.053Z
async function getArchivedQuizzes() {
    const result = await db.quiz.find();

    if (!result) {
        return util.httpResponse(404, {
            data: {
                errMsg: 'No quiz found'
            }
        })
    }
    
    var date = new moment();
    const resultArray = []
    for (var res of result) {
        var startTime = res.startTime;
        var interval = res.interval;

        var activeTime = new moment(startTime);
        var startTimeC = new moment(startTime);
        startTimeC = startTimeC.add(interval, 'hours');
        if (date > startTimeC) {
            const quizDetails = {
                quizId: res.quizId,
                name: res.name,
                domain: res.domain,
                description: res.description,
            }
            resultArray.push(quizDetails);
        }
    }
    if (!resultArray.length) {
        return util.httpResponse(404, {
            data: {
                errMsg: 'No quiz found'
            }
        })
    }
    return util.httpResponse(200, {
        data: resultArray
    })
}


async function startQuiz({ userId }, ctx) {
    const quizId = ctx.params.quizId;

    const result = await db.score.find({ userId: userId, quizId: quizId }, { attemptId: 1, attemptNo: 1 })
    var attemptNo = 0;
    if (result) {
        for (var res of result) {
            if (res.attemptNo > attemptNo) {
                attemptNo = res.attemptNo;
            }
        }
    
        console.log(attemptNo);
        attemptNo = attemptNo + 1;
        console.log(attemptNo);
        const result1 = await db.attempt.findOne({ quizId: quizId, userId: userId, attemptNo: attemptNo }, { attemptId: 1 })
        if (result1) {
            console.log("theres an open session which hasnt been submitted properly");

            const attemptId = result1.attemptId;
            //fetch next qtn in session
            const questionStatus = false;
            const result2 = await db.attempt.findOne({ attemptId: attemptId, questionStatus: questionStatus }, { questionId: 1 })
            if (result2) {
                const questionId = result2.questionId;

                const result3 = await db.questions.findOne({ questionId: questionId }, { questionId: 1, questionText: 1, choice: 1 });
                if (result3) {
                    const questionDetails = {
                        questionText: result3.questionText,
                        choice: result3.choice,
                        questionId: result3.questionId,
                        attemptId: attemptId,
                    }
                    return util.httpResponse(200, {
                        data: questionDetails
                    })
                }
            }
            else {
                // no more qtns left unanswered , hence calculate result and show
                const result4 = await db.attempt.find({ quizId: quizId, attemptId: attemptId, userId: userId, attemptNo: attemptNo }, { userAnswer: 1, answer: 1 })
                var score = 0;
                var totalQuestions = 0;
                if (result4) {
                    for (var res of result4) {
                        totalQuestions = totalQuestions + 1;
                        if (res.answer == res.userAnswer) {
                            score = score + 1;
                        }
                    }
                }
                await db.score.create({
                    attemptId
                })
                await db.score.findOneAndUpdate({
                    attemptId
                }, {
                        userId: userId,
                        quizId: quizId,
                        attemptId: attemptId,
                        attemptNo: attemptNo,
                        score: score,
                        state: true
                    })
                const resultDetails = {
                    score: score,
                    totalQuestions: totalQuestions
                }
                return util.httpResponse(200, {
                    result: resultDetails
                })
            }
        }
    }
    //create a new attempt with attemptNo
    const attemptId = util.generateRandomString(5);
    console.log("Getting all question ids in attempt table");
    console.log(attemptNo);
    if (attemptNo > 0) {
        const result7 = await db.quiz.findOne({ quizId: quizId })
        if (result7) {
            console.log(result7);
            var date = new moment();
            var interval = result7.interval;
            console.log(interval);
            var startTime = result7.startTime;
            var activeTime = new moment(startTime);
            activeTime = activeTime.add(interval, 'hours');
            console.log(date, activeTime, interval);
            if (date < activeTime) {
                return util.httpResponse(400, {
                    data: {
                        errMsg: 'You have already attempted the quiz.'
                    }
                })
            }
        }
    }
    //get all questionIds of quizId in an array 
    const result5 = await db.questions.find({ quizId: quizId }, { questionId: 1, answer: 1 })
    if (result5) {
        const questionIdArray = [];
        for (var res of result5) {
            const questionDetails = {
                questionId: res.questionId,
                choice: res.choice,
                answer: res.answer
            }
            questionIdArray.push(questionDetails);
        }
        for (var res1 of questionIdArray) {
            const _id = util.generateRandomString(5);
            const entry1 = await db.attempt.create({
                attemptId,
                _id

            })
            await db.attempt.findOneAndUpdate({
                attemptId, _id
            }, {
                    userId: userId,
                    quizId: quizId,
                    attemptId: attemptId,
                    attemptNo: attemptNo,
                    questionId: res1.questionId,
                    answer: res1.answer,
                    questionStatus: false
                }
            )
            console.log("created an entry in attempt table");
        }
        console.log("created all entries for attempt table");

        // now fetch first question for user
        const result6 = await db.questions.findOne({ quizId: quizId }, { questionId: 1, questionText: 1, choice: 1 });
        if (result6) {
            return util.httpResponse(200, {
                data: {
                    questionText: result6.questionText,
                    choice: result6.choice,
                    questionId: result6.questionId,
                    attemptId : attemptId,
                }
            });
        }
        else {
            return util.httpResponse(404, {
                data: {
                    errMsg: 'Cannot find question details'
                }
            })
        }
    }
}

async function hoF({ },ctx) {
    //active quizIds
    const quizId = ctx.params.quizId;

    const scoreArray = [];
    const result = await db.score.find({ quizId:quizId }, { userId: 1, correct: 1 })
    if (result) {
        for (var res2 of result) {
            const resultDetails = {
                userId: res2.userId,
                score: res2.correct
            }
            scoreArray.push(resultDetails)
        }
        scoreArray.sort(function (a, b) {
            return a[2] - b[2]
        });

        const userScores = [];
        for (var res3 of scoreArray) {
            const userId = res3.userId;
            const result2 = await db.users.findOne({ userId: userId }, { userName: 1 });
            if (result2) {
                const userDetails = {
                    userName: result2.userName,
                    Score: res3.score
                }
                userScores.push(userDetails);
            }
        }
        return util.httpResponse(200, {
            result: userScores
        })
    }
    else {
        return util.httpResponse(200, {
            message: 'No attempts yet'
        })
    }
}

async function getQuizResult({}, ctx) {
    const quizId = ctx.params.quizId;
    const attemptId = ctx.params.attemptId;
    const userId=null;

    console.log("attt", quizId, attemptId);
    const result = await db.score.findOne({ attemptId: attemptId, userId: userId, quizId: quizId }, { correct: 1, totalQuestions: 1 })
    if (result) {

        return util.httpResponse(200, {
            data: {
                result: {
                    score: result.correct,
                    questionCount: result.totalQuestions
                }
            }
        });
    }
    return util.httpResponse(400, {
        data: {
            errMsg: 'Unable to get results'
        }
    });
}
module.exports = {
    createQuiz,
    showAllQuizzes,
    showQuiz,
    getActiveQuizzes,
    getUpcomingQuizzes,
    getArchivedQuizzes,
    getQuizResult,
    startQuiz,
    scheduleQuiz,
    hoF
}
