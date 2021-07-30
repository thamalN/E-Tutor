const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "etutor",
    dateStrings: true
})

module.exports = db 