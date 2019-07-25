'use strict'

const koa = require('koa')
const compress = require('koa-compress')
const router = require('./src/router')
const cors = require('kcors')

const koaBody = require('koa-body')({
    multipart: true
})

global.base_dir = __dirname;
global.abs_path = function (path) {
    return base_dir + path;
}
global.include = function (file) {
    return require(abs_path('/' + file));
}

const app = new koa()
app.use(cors())
app.use(compress({
    level: 3
}))

app.use(koaBody)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)