module.exports = function (app, db) {

    app.post("/teacherHome/courses", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT COUNT(course_id) AS courses FROM course WHERE teacher_id=?;";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result[0].courses)
        })
    })

    app.post("/teacherHome/students", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT enroll.course_id, course.course_name, course.year, user.fname, user.lname, user.user_id, user.user_flag from enroll INNER JOIN user ON enroll.student_id=user.user_id INNER JOIN course ON course.course_id=enroll.course_id WHERE enroll.course_id IN (SELECT course_id FROM course WHERE teacher_id=? GROUP BY course_id);";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/teacherHome/quizzes", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT * FROM quiz INNER JOIN course ON course.course_id = quiz.course_id WHERE quiz.course_id IN (SELECT course_id FROM course WHERE teacher_id=? GROUP BY course_id) AND quiz.deadline >= CURDATE();";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

}