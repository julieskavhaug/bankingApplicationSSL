const db = require("./db/db.js");
const accountModel = require("./models/account.js");


db.getConnection().then(async res => {
    // if a connection was successfully achieved
    // find and execute are two functions, that called in succession will first describe how to find elements, and then execute the query
    let accounts = await accountModel.find().exec();
    console.log(accounts);


    // exit system
    process.exit(1)
}, err => {
    console.log("ERROR");
    console.log(err);
});