'use strict'

const db = require('../db')

async function authorize(ctx, next) {
    if (!ctx.request.header['authorization']) {
        ctx.status = 401
        ctx.body = {
            data: {
                errMsg: 'You are not authorized'
            }
        }
        return ctx
    }
    const user = await db.users.findOne({
        authToken: ctx.request.header['authorization']
    })
    if(!user) {
        ctx.status = 401
        ctx.body = {
            data: {
                errMsg: 'You are not authorized'
            }
        }
        return ctx
    }
    ctx.user = user
    return await next()
}

module.exports = {
    authorize
}