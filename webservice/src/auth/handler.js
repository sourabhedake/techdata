'use strict'

const _ = require('ramda')
const db = require('../db')
const util = require('../util')
const jwt = require('jsonwebtoken')

const jwtKey = util.generateRandomString(25)
const jwtExp = 24 * 60 * 60;

async function login(
    request_body, ctx
) {
    const email = request_body.email;
    const password = request_body.password;

    const user = await db.users.findOne({
        email
    })

    if (!user) {
        return util.httpResponse(400, {
            message: 'Invalid email or password entered'
        })
    }

    const encryptedPassword = user.password

    const isValidUser = encryptedPassword === util.sha512(password, user.createdAt.toUTCString())

    if (!isValidUser) {
        return util.httpResponse(400, {
            message: 'Invalid email or password entered'
        })
    }

    const token = jwt.sign({ 
        email, 
        userId: user.userId,
        name: user.fullName
    }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExp
    })

    await db.users.findOneAndUpdate({
        userId: user.userId
    }, {
            authToken: token
    }, {
        new: true,
        select: {
            authToken: 1,
            _id: 0
        }
    })

    ctx.cookies.set('token', token, {httpOnly: true, signed: true});
    return util.httpResponse(200, {
        data: {
            token: token,
            userId: user.userId
        }
    })
}

async function logout(request_body, ctx)
{
    // email="aa";
    // const user = await db.users.findOne({
    //     email
    // })

    // if (!user) {
    //     return util.httpResponse(400, {
    //         message: 'Invalid email entered'
    //     })
    // }

    // await db.users.findOneAndUpdate({
    //     userId: user.userId
    // }, {
    //         authToken: ''
    //     }, {
    //         new: true,
    //         select: {
    //             authToken: 1,
    //             _id: 0
    //         }
    //     })
    return util.httpResponse(200)
}

async function signup(request_body, ctx) {
    const fullName = request_body.fullName;
    const email = request_body.email;
    const password = request_body.password;
    const role = request_body.role;

    if (!email) {
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
        email
    })

    if (result) {
        return util.httpResponse(404, {
            message: 'User already exists'
        })
    }

    const userId = util.generateRandomString(5)

    const user = await db.users.create({
        userId,
    })

    await db.users.findOneAndUpdate({
        userId
    }, {
        userName:userName,
        role:role,
        password: util.sha512(password, user.createdAt.toUTCString()),
        fullName: fullName,
        email: email
    })

    return util.httpResponse(200, {
        message: 'User signup is successful'
    })
}

async function resetPassword(request_body) {
    const userName = request_body.userName;
    const password = request_body.password;

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

async function getUserDetails(request_body, ctx) {
    const userId = request_body.userId;

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
    login,
    logout,
    signup,
    resetPassword,
    getUserDetails
}