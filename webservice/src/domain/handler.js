'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')
const url = require('url')


async function createQuiz(request_body, ctx) {
    const quizName = request_body.quizName;
    const domainName = request_body.domainName;
    const description = request_body.description;

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

async function addQuestion(request_body, ctx) {
    const quizId = request_body.quizId;
    const questionText = request_body.questionText;
    const choice = request_body.choice;
    const answer = request_body.answer;

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

async function showAllQuizzes(request_body, ctx) {

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

async function showQuiz(request_body, ctx) {
    const quizId = request_body.quizId;

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

async function showAllDomains() {
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

async function showDomain(request,response) {
    console.log(request);
    console.log("hello showdomain")
    var url_parts = url.parse(request.url, true);
    console.log("jesus")
    var query = url_parts.query;
    console.log("hellp");
    const domainId = req.query.domainId;
    console.log(domainId);
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

async function createDomain(request_body, ctx) {
    const domainName = request_body.domainName;
    const description = request_body.description;

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

async function showQuestion(request_body, ctx) {
    const questionId = request_body.questionId;

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

async function showAllQuestions(request_body, ctx) {
    const quizId = request_body.quizId;

    const result = await db.questions.find({ quizId: quizId }, { startTime: 1, questionId: 1, questionText: 1, choice: 1, answer: 1 })
    if (!result) {
        return util.httpResponse(400, {
            message: 'No Questions found'
        })
    }
    var date = new Date();
    const result1 = await db.quiz.findOne({ quizId: quizId }, {
        startTime: 1
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

async function getActiveQuizzes() {

    const result = await db.quiz.find({},{ startTime: 1, quizId:1 })
    if (!result) {
        return util.httpResponse(404, {
            message: 'No Quiz found'
        })
    }
    var date = new Date();
    const resultArray = []
    for (var res of result) {
        var startTime = res.startTime;
        var activationTime = new Date(startTime);
        if (date > activationTime) {
            const quizDetails = {
                quizId: res.quizId,
                startTime: res.startTime
            }
            resultArray.push(quizDetails)
        }
    }
    return util.httpResponse(200, {
        result: resultArray
    })
}

async function getUpcomingQuizzes() {
    const result = await db.quiz.find({}, { startTime: 1, quizId: 1 })
    if (!result) {
        return util.httpResponse(404, {
            message: 'No Quiz found'
        })
    }
    var date = new Date();
    const resultArray = []
    for (var res of result) {
        var startTime = res.startTime;
        var activationTime = new Date(startTime);
        if (date < activationTime) {
            const quizDetails = {
                quizId: res.quizId,
                startTime: res.startTime
            }
            resultArray.push(quizDetails)
        }
    }
    return util.httpResponse(200, {
        result: resultArray
    })
}

async function startQuiz(request_body, ctx) {
    const quizId = request_body.quizId;
    const userId = request_body.userId;

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
                        questionId: result3.questionId
                    }
                    return util.httpResponse(200, {
                        result: questionDetails
                    })
                }
            }
            else {
                // no more qtns left unanswered , hence calculate result and show
                const result4 = await db.attempt.find({ quizId: quizId, attemptId: attemptId, userId: userId, attemptNo : attemptNo }, { userAnswer: 1, answer: 1 })
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
    if (attemptNo > 1) {
        const result7 = await db.quiz.find({ quizId: quizId }, { startTime: 1, interval: 1 })
        if (result7) {
            const interval = result7.interval;
            var date = new Date();
            var startTime = result7.startTime;
            var activationTime = new Date(startTime);
            console.log(activationTime);
            activationTime.setHours(activationTime.getHours() + interval);
            console.log(activationTime);
            if (date < activationTime) {
                return util.httpResponse(404, {
                    message: 'Quiz attempted already'
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
            const questionDetails = {
                questionText: result6.questionText,
                choice: result6.choice,
                questionId: result6.questionId
            }
            return util.httpResponse(200, {
                result: questionDetails
            })
        }
        else {
            return util.httpResponse(200, {
                message: 'Cant find question details'
            })
        }
    }
}

async function nextQuestion(request_body, ctx) {
    const quizId = request_body.quizId;
    const userId = request_body.userId;
    const attemptId = request_body.attemptId;
    const previousQtnId = request_body.questionId;
    const userAnswer = request_body.answer;

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
                const questionDetails = {
                    questionText: result2.questionText,
                    choice: result2.choice,
                    questionId: result2.questionId
                }
                return util.httpResponse(200, {
                    result: questionDetails
                })
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
                console.log(score);
                console.log(totalQuestions);
                console.log(attemptNo);
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

                const result9 = await db.score.findOne({ attemptId: attemptId, userId: userId, quizId: quizId }, {correct:1, totalQuestions:1 })
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
    else {
        const result8 = await db.score.findOne({ userId: userId, quizId: quizId, attemptId: attemptId }, { correct: 1, totalQuestions: 1 })
        if (result8) {
            const scoreDetails = {
                correct: result8.correct,
                totalQuestions: result8.totalQuestions
            }
            return util.httpResponse(404, {
                result: scoreDetails
            })
        }
    }
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
    showAllQuestions,
    getActiveQuizzes,
    getUpcomingQuizzes,
    startQuiz,
    nextQuestion
}
