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
    fullName: String,
    role: String,
    authToken: String
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const questions = mongoose.Schema({
    questionId: String,
    questionText: String,
    quizId: String,
    practiceId: String,
    choice: [{ type: String }],
    answer: Number
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const domain = mongoose.Schema({
    domainId: String,
    name: String,
    description: String,
    img: String,
    quizId: [{ type:String }]
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

practice = mongoose.Schema({
    practiceId: String,
    name: String,
    domain: domain,
    img: String,
    description: String,
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

quiz = mongoose.Schema({
    quizId: String,
    name: String,
    domainId: String,
    img: String,
    description: String,
    startTime: String,
    interval: Number
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

attempt = mongoose.Schema({
    _id: String,
    userId: String,
    quizId: String,
    attemptId: String,
    attemptNo: Number,
    questionId: String,
    questionStatus: Boolean,
    answer: Number,
    userAnswer: Number,
}, {
        versionKey: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
});

score = mongoose.Schema({
    userId: String,
    quizId: String,
    attemptId: String,
    attemptNo: Number,
    correct: Number,
    totalQuestions: Number,
    state: Boolean
}, {
        versionKey: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
});

map_subdomain = mongoose.Schema({
    domain: String,
    subDomain: String,
}
    , {
        versionKey: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    });

urls = mongoose.Schema({
    domainId: String,
    url: String,
    filter: String
}, {
        versionKey: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    });

news = mongoose.Schema({
    newsId: String,
    url: String,
    heading: String,
    description: String
}, {
        versionKey: false,
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
});


module.exports = {
    users:      mongoose.model('users', user),
    domain:     mongoose.model('domains', domain),
    practice:   mongoose.model('practice', practice),
    quiz:       mongoose.model('quizzes', quiz),
    questions:  mongoose.model('questions', questions),
    attempt:    mongoose.model('attempt', attempt),
    urls:       mongoose.model('urls',urls),
    score:      mongoose.model('scores', score),
    map_subdomain: mongoose.model('map_subdomains', map_subdomain),
    news: mongoose.model('news', news),
}
