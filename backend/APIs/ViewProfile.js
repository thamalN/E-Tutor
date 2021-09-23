const bcrypt = require("bcryptjs")
const { validateToken } = require('./JWT')

module.exports = function (app, db, upload) {

    app.post("/viewProfile/", validateToken, (req, res) => {
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
            res.json(result[0])
        })

    })

    app.post("/editProfile/", validateToken, upload.none(), (req, res) => {
        console.log(req.body)
        const user_id = req.body.user_id;
        const user_flag = req.body.user_flag;
        const fname = req.body.FirstName;
        const lname = req.body.LastName;
        const street_no = req.body.StreetNo;
        const street = req.body.StreetName;
        const city = req.body.City;
        const province = req.body.Province;
        const email = req.body.Email;
        const contact = req.body.Contact;
        const birthday = req.body.Birthday;
        const gender = req.body.Gender;
        const username = req.body.userName;
        const password = req.body.Password;

        const nic = req.body.NIC
        const guardian_contact = req.body.guardianContact;
        const school = req.body.School;
        const grade = req.body.grade;
        const qualifications = req.body.qualifications

        const query1 = "UPDATE user SET fname=?, lname=?, street_no=?, street=?, city=?, province=?, email=?, contact=?, birthday=?, gender=?, username=? WHERE user_id=?"

        db.query(query1, [fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, user_id], (err, result) => {
            if (err) throw err;
        })

        if(password) {
            const query2 = "UPDATE user SET password=? WHERE user_id=?"

            bcrypt.hash(password[0], 10).then(hash => {
                db.query(query2, [hash, user_id], (err, result) => {
                    if(err) throw err
                })

            }).catch(err => {
                console.log(err)
            })
        }

        const query3 = "UPDATE ?? SET ? WHERE ?? = ?"

        let table
        let inserts = {}
        let id

        if (user_flag === '1') {
            table = "admin"
            inserts['nic'] = nic
            id = "admin_id"
        } else if (user_flag === '2') {
            table = "staff"
            inserts['nic'] = nic
            id = "staff_id"
        } else if (user_flag === '3') {
            table = "teacher"
            inserts['nic'] = nic
            inserts['school'] = school
            inserts['qualifications'] = qualifications
            id = "teacher_id"
        } else if (user_flag === '4') {
            table = "student"
            inserts['school'] = school
            inserts['grade'] = grade
            inserts['guardian_contact'] = guardian_contact
            id = "student_id"
        }

        db.query(query3, [table, inserts, id, user_id], (err, result) => {
            if (err) throw err
        })

        res.send("ok")
    })
}