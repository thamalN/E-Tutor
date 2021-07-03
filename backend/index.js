const db = require('./db_connection')
const express = require('express')
const app = express()

app.get("/", (req, res) => {
    // const query = "INSERT INTO user(username) VALUES ('user1');"
    // db.query(query, (err, result) => {
    //     if (err) throw err;
        res.send("Done")
    // })
})

app.listen(3001, () => {
    console.log("Server Started")
})