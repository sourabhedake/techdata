'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')

async function signin({
    userName,
    password
}) {
    console.log (userName)
    console.log (password)

    const user = await db.users.findOne({
        userName
    })

    if (!user) {
        return util.httpResponse(400, {
            message: 'Invalid user namssse or password entered'
        })
    }

    const encryptedPassword = user.password
    const authToken = util.generateRandomString(25)

    const isValidUser = encryptedPassword === util.sha512(password, user.createdAt.toUTCString())

    if (!isValidUser) {
        return util.httpResponse(400, {
            message: 'Invalid user name or password entered'
        })
    }

    const updatedUser = await db.users.findOneAndUpdate({
        userId: user.userId
    }, {
        authToken
    }, {
        new: true,
        select: {
            authToken: 1,
            _id: 0
        }
    })

    return util.httpResponse(200, {
        message: 'Login successful',
        authToken: updatedUser.authToken,
        client: true
    })
}

async function signup({
    userName,
    password
}) {
    const result = await db.users.findOne({
        userName
    })

    if (result) {
        return util.httpResponse(400, {
            message: 'User already exists'
        })
    }

    const userId = util.generateRandomString(5)

    const user = await db.users.create({
        userName,
        userId
    })

    await db.users.findOneAndUpdate({
        userName
    }, {
        password: util.sha512(password, user.createdAt.toUTCString())
    })

    return util.httpResponse(200, {
        message: 'user created successfully'
    })
}

async function resetPassword({
    userName,
    password
}) {
    if (!userName) {
        return util.httpResponse(400, {
            message: 'Invalid username provided'
        })
    }
    const userResult = await db.users.findOne({
        userName
    })

    if (!userResult) {
        return util.httpResponse(400, {
            message: 'Invalid username provided'
        })
    }

    await db.users.findOneAndUpdate({
        userName
    }, {
        password: util.sha512(password, userResult.createdAt.toUTCString())
    })

    return util.httpResponse(200, {
        message: 'Password updated successfully'
    })
}

module.exports = {
    signin,
    signup,
    resetPassword
}