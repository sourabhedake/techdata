const mongoose = require('mongoose')
const _ = require('ramda')

mongoose.Promise = global.Promise
const __setOptions = mongoose.Query.prototype.setOptions
mongoose.Query.prototype.setOptions = function () {
    __setOptions.apply(this, arguments)
    this._mongooseOptions.lean = true
    return this
}

mongoose.connect('mongodb://localhost/techdata', {
    user: 'techdata',
    pass: 'techdataReLeAsE2019',
    useNewUrlParser: true,
    useFindAndModify: false,
    auth: {
        authdb: 'auth'
    },
    config: {
        autoIndex: false
    }
})

const user = mongoose.Schema({
    userId: String,
    userName: String,
    email: String,
    password: String,
    firstName: String,
    middleName: String,
    lastName: String,
    mobile: String,
    authToken: String
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

module.exports = {
    users: mongoose.model('users', user),
}