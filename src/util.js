// Utility Functions
'use strict'
const _ = require('ramda')
const crypto = require('crypto')

function wrapHandler(handler) {
    return async function (ctx, next) {
        try {
            const response = await handler(ctx.request.body, _.merge(ctx, {}), next)
            if (response.redirect)
                ctx.redirect(response.redirect)
            for (const key in response)
                ctx[key] = response[key]
        } catch (error) {
            console.log(error)
            ctx.status = 500
            ctx.body = {
                error: ' Internal Server Error. Please contact administrator.'
            }
        }
    }
}

const wrapHandlerModule = (module) => _.fromPairs(
    _.map(([name, fun]) => [name, wrapHandler(fun)],
        _.toPairs(module)))

const httpResponse = (status, body) => {
    return {
        status,
        body: body ? body : {}
    }
}

const sha512 = (password, salt) => {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const value = hash.digest('hex')
    return value
}

const generateRandomString = (length = 10) => crypto.randomBytes(length).toString('hex')

module.exports = {
    wrapHandlerModule,
    httpResponse,
    sha512,
    generateRandomString
}