const { requiresStudent } = require('./JWT')
module.exports = function (app, db, upload) {

    app.get("/studentHome/StudentDetails/:id", requiresStudent, (req, res) => {
        const studentId = req.params.id;

        const query = "SELECT s.school, s.grade, s.guardian_contact, u.fname,u.lname,u.username,u.street_no,u.street,u.city,u.province,u.contact,DATE_FORMAT (u.birthday, '%d/%m/%Y'),u.gender FROM student AS s INNER JOIN user AS u ON u.user_id = ?;";

        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            console.log(err)
            res.json(result[0])
        })
    })

    app.post("/studentHome/StudentDetailsUpdate/:id", requiresStudent, (req, res) => {
        const studentId = req.params.id;

        const firstname = req.body.fname;
        const lastname = req.body.lname;
        const street_no = req.body.street_no;
        const street = req.body.street;
        const city = req.body.city;
        const province = req.body.province;

        const contact = req.body.contact;
        const birthday = req.body.birthday;
        const gender = req.body.gender;
        const guardian_contact = req.body.guardian_contact;
        const school = req.body.school;
        const grade = req.body.grade;

        console.log(firstname);
        const query = "UPDATE user SET fname = ?, lname = ?, street_no = ?, street = ?, city = ?, province = ?, contact = ?, birthday = ?, gender = ? WHERE user.user_id = ?;";
        const query2 = "UPDATE student SET grade = ?, school = ?, guardian_contact = ? WHERE student.student_id = ?;";


        db.query(query, [firstname, lastname, street_no, street, city, province, contact, birthday, gender, studentId], (err, result) => {
            if (err) throw err;
            let user_id = result.insertId;
            console.log(user_id);


            db.query(query2, [grade, school, guardian_contact, studentId], (err, result) => {
                res.json(result.insertId);

            });
        });

    })



}