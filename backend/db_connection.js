const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "etutor",
    dateStrings: true,
    multipleStatements: true
})

module.exports = db 