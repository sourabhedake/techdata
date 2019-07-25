const db = require('../src/db')
const co = require('co')
const _ = require('ramda')
const util = require('../src/util')

const usersJson = require('./users.json')
const organisationsJson = require('./organisations.json')
const clerksJson = require('./clerks.json')

const defaultPassword = 'asdf1234'

async function resetPassword() {
    const userList = await db.users.find({} , {
        _id: 0,
        userId: 1,
        createdAt: 1
    })

    await Promise.all(_.map(function (user) {
        return db.users.findOneAndUpdate({
            userId: user.userId
        }, {
            $set: {
                password: util.sha512(defaultPassword, user.createdAt.toUTCString()),
            }
        })
    }, userList))

    const clerkList = await db.clerks.find({} , {
        _id: 0,
        clerkId: 1,
        createdAt: 1
    })

    await Promise.all(_.map(function (clerk) {
        return db.clerks.findOneAndUpdate({
            clerkId: clerk.clerkId
        }, {
            $set: {
                password: util.sha512(defaultPassword, clerk.createdAt.toUTCString()),
            }
        })
    }, clerkList))
}

async function seeder() {
    // clear all data
    await db.users.remove()
    await db.organisations.remove()
    await db.clerks.remove()

    // insert seed data
    await db.users.insertMany(usersJson)
    await db.organisations.insertMany(organisationsJson)
    await db.clerks.insertMany(clerksJson)
    
    await resetPassword()
    return 1
}

seeder().then(function (res) {
    console.log(res)
    console.log('Seeder success')
    process.exit()
}).catch(function (err) {
    console.log(err)
    console.log('Seeder failed')
    process.exit()
})