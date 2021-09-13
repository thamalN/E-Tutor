module.exports = function (app, db) {

    app.post("/viewProfile/", (req, res) => {
        const user_id = req.body.user_id
        const user_flag = req.body.user_flag

        //user.fname, user.lname, user.street_no, user.street, user.city, user.province, user.email, user.contact, user.birthday, user.gender, user.regDate, user.username, user.password

        let query = "SELECT * from user INNER JOIN ?? ON ??.?? = user.user_id WHERE user.user_id=?"
        let inserts = []

        if(user_flag === 1) {
            inserts = Array(3).fill("admin")
        } else if(user_flag === 2) {
            inserts = Array(3).fill("staff")
        } else if(user_flag === 3) {
            inserts = Array(3).fill("teacher")
        } else if(user_flag === 4) {
            inserts = Array(3).fill("student")
        }

        inserts[2] += "_id"
        inserts.push(user_id)

        db.query(query, inserts, (err, result) => {
            if(err) throw err
            console.log(result)
            res.json(result[0])
        })

    })
}