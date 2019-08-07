'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')

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

async function showDomain({},ctx)
{
    const domainId = ctx.params.domainId;
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

module.exports = {
    showAllDomains,
    showDomain,
    createDomain
}
