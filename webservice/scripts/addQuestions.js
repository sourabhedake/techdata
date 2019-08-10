const db = require('../src/db')
const co = require('co')
const _ = require('ramda')
const util = require('../src/util')

async function addQuestion() {

    quizId = "f67d984b37";
    questionText = ["Hi How are you?", "Hello?", "hey?"];
    questionId = [util.generateRandomString(5), util.generateRandomString(5), util.generateRandomString(5)];
    answer=[1,3,2];
    choice=["qwe,ads,ert,wer", "qwe,qwe,qwe,ert", "wer1,we2r,we3r,wer4"];

    for (let index = 0; index < questionText.length; index++) {
        const element = questionText[index];
        

        await db.questions.create({
            questionId: questionId[index]
        })
        await db.questions.findOneAndUpdate({
            questionId: questionId[index]
        }, {
                questionText: questionText[index],
                quizId: quizId,
                answer: answer[index],
                $push: { choice: choice[index].split(",") },
            }
        )

    }

}

async function seeder() {
    // clear all data
    await addQuestion()
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