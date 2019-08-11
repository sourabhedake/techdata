'use strict'

const cron = require('node-cron');
const Handler = require('./src/domain/handler');
console.log("Scheduler running");
Handler.getNews();
cron.schedule("* 1 * * * *", () => {
    console.log(`1 hour passed, scheduling fetch`);
    Handler.getNews();
    console.log("Db updated");
});