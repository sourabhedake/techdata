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
    password,
    role,
    firstName,
    lastName,
    email
}) {
    if (!userName) {
        return util.httpResponse(400, {
            message: 'Insufficient Info'
        })
    }
    if (!password) {
        return util.httpResponse(400, {
            message: 'Insufficient Info'
        })
    }
    const result = await db.users.findOne({
        userName: userName
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
        userId
    }, {
        userName:userName,
        role:role,
        password: util.sha512(password, user.createdAt.toUTCString()),
        firstName: firstName,
        lastName: lastName,
        email: email
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

async function getUserDetails({
    userId
}) {
    const result = await db.users.findOne({ userId: userId }, {userName:1,firstName:1,lastName:1,email:1});
    if (!result) {
        return util.httpResponse(400, {
            message: 'No user with this userId found'
        })
    }
    else {
        const userDetails = {
            userName: result.userName,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email
        }
        return util.httpResponse(200, {
            result: userDetails
        })
    }
}

module.exports = {
    signin,
    signup,
    resetPassword,
    getUserDetails
}