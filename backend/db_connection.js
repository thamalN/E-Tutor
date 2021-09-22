const mysql = require("mysql")

const db = mysql.createPool({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "etutor",
    host: "us-cdbr-east-04.cleardb.com",
    user: "be6c4be6085750",
    password: "b3669710",
    database: "heroku_0d494fab0b6e60e",
    dateStrings: true,
    multipleStatements: true
})

module.exports = db 