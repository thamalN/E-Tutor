module.exports = function (app, db) {
    app.get("/getAllTeachers", (req, res) =>{

        const query = "SELECT teacher.teacher_id, user.fname, user.lname FROM teacher INNER JOIN user ON teacher.teacher_id=user.user_id";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/getTeacherPayments", (req, res) =>{

        const query = "SELECT teacher.teacher_id, SUM(payment.amount)*0.6 AS amount_payable, user.fname, user.lname, user.email, user.contact, user.street_no, user.street, user.city, user.province FROM course RIGHT JOIN teacher ON teacher.teacher_id=course.teacher_id LEFT JOIN payment ON payment.course_id=course.course_id AND payment.verified=1 AND payment.month='August' INNER JOIN user ON user.user_id=teacher.teacher_id GROUP BY teacher.teacher_id";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

};