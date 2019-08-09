'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')

async function getUserDetails({},ctx) {
    const userId = ctx.params.userId;
    const result = await db.users.findOne({ userId: userId }, { userName: 1, fullName: 1, email: 1 });
    if (!result) {
        return util.httpResponse(400, {
            message: 'No user with this userId found'
        })
    }
    else {
        const userDetails = {
            userName: result.userName,
            fullName: result.fullName,
            email: result.email
        }
        return util.httpResponse(200, {
            result: userDetails
        })
    }
}



module.exports = {
    getUserDetails
}