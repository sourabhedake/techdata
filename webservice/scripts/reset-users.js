const db = require('../src/db')
const co = require('co')
const _ = require('ramda')
const util = require('../src/util')

const usersJson = require('./users.json')
const defaultPassword = 'testuser'

async function resetPassword() {
    const userList = await db.users.find()

    await Promise.all(_.map(function (user) {
        console.log(user)
        return db.users.findOneAndUpdate({
            userId: user.userId
        }, {
            $set: {
                password: util.sha512(defaultPassword, user.createdAt.toUTCString()),
            }
        },
        {
            useFindAndModify: false
        })
    }, userList))
}

async function seeder() {
    // clear all data
    await db.users.deleteMany()
    // insert seed data
    await db.users.insertMany(usersJson)
    await resetPassword()
    return true;
}

seeder().then(function (res) {
    console.log('Seeder success -> ' + res)
    process.exit()
}).catch(function (err) {
    console.log(err)
    console.log('Seeder failed')
    process.exit()
})