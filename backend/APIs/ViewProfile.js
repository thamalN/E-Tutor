const bcrypt = require("bcrypt")

module.exports = function (app, db) {

    app.post("/viewProfile/", (req, res) => {
        const user_id = req.body.user_id
        const user_flag = req.body.user_flag

        //user.fname, user.lname, user.street_no, user.street, user.city, user.province, user.email, user.contact, user.birthday, user.gender, user.regDate, user.username, user.password

        let query = "SELECT * from user INNER JOIN ?? ON ??.?? = user.user_id WHERE user.user_id=?"
        let inserts = []

        if (user_flag === 1) {
            inserts = Array(3).fill("admin")
        } else if (user_flag === 2) {
            inserts = Array(3).fill("staff")
        } else if (user_flag === 3) {
            inserts = Array(3).fill("teacher")
        } else if (user_flag === 4) {
            inserts = Array(3).fill("student")
        }

        inserts[2] += "_id"
        inserts.push(user_id)

        db.query(query, inserts, (err, result) => {
            if (err) throw err
            console.log(result)
            res.json(result[0])
        })

    })

    app.post("/editProfile/", (req, res) => {

        const user_id = req.body.user_id;
        const user_flag = req.body.user_flag;
        const fname = req.body.fname;
        const lname = req.body.lname;
        const street_no = req.body.street_no;
        const street = req.body.street;
        const city = req.body.city;
        const province = req.body.province;
        const email = req.body.email;
        const contact = req.body.contact;
        const birthday = req.body.birthday;
        const gender = req.body.gender;
        const username = req.body.username;
        const password = req.body.password;

        const nic = req.body.nic
        const guardian_contact = req.body.guardian_contact;
        const school = req.body.school;
        const grade = req.body.grade;
        const qualifications = req.body.qualifications

        bcrypt.hash(password, 10).then(hash => {
            const query1 = "UPDATE user SET fname=?, lname=?, street_no=?, street=?, city=?, province=?, email=?, contact=?, birthday=?, gender=?, username=?, password=? WHERE user_id=?"

            db.query(query1, [fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, hash, user_id], (err, result) => {
                if (err) throw err;
            })
        }).catch(err => {
            console.log(err)
        })

        const query2 = "UPDATE ?? SET ? WHERE ?? = ?"

        let table
        let inserts = {}
        let id

        if (user_flag === 1) {
            table = "admin"
            inserts['nic'] = nic
            id = "admin_id"
        } else if (user_flag === 2) {
            table = "staff"
            inserts['nic'] = nic
            id = "staff_id"
        } else if (user_flag === 3) {
            table = "teacher"
            inserts['nic'] = nic
            inserts['school'] = school
            inserts['qualifications'] = qualifications
            id = "teacher_id"
        } else if (user_flag === 4) {
            table = "student"
            inserts['school'] = school
            inserts['grade'] = grade
            inserts['guardian_contact'] = guardian_contact
            id = "student_id"
        }

        db.query(query2, [table, inserts, id, user_id], (err, result) => {
            if (err) throw err
        })

        res.send("ok")
    })
}