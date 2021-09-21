const { requiresTeacher } = require('./JWT')
const { requiresStudent } = require('./JWT')


module.exports = function (app, db) {

    app.post("/teacherHome/courses", requiresTeacher, (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT COUNT(course_id) AS courses FROM course WHERE teacher_id=?;";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result[0].courses)
        })
    })

    app.post("/teacherHome/students", requiresTeacher, (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT enroll.course_id, course.course_name, course.year, user.fname, user.lname, user.user_id, user.user_flag from enroll INNER JOIN user ON enroll.student_id=user.user_id INNER JOIN course ON course.course_id=enroll.course_id WHERE enroll.course_id IN (SELECT course_id FROM course WHERE teacher_id=? GROUP BY course_id);";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/teacherHome/quizzes", requiresTeacher, (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT * FROM quiz INNER JOIN course ON course.course_id = quiz.course_id WHERE quiz.course_id IN (SELECT course_id FROM course WHERE teacher_id=? GROUP BY course_id) AND quiz.deadline >= CURDATE();";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/studentHome/courses", requiresStudent, (req, res) => {
        const studentId = req.body.id;

        const query = "SELECT COUNT(course_id) AS courses FROM course WHERE student_id=?;";

        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result[0].courses)
        })
    })

    app.post("/studentHome/quizzes", requiresStudent, (req, res) => {
        const studentId = req.body.id;

        const query = "SELECT * FROM quiz INNER JOIN course ON course.course_id = quiz.course_id WHERE quiz.course_id IN (SELECT course_id FROM course WHERE student_id=? GROUP BY course_id) AND quiz.deadline >= CURDATE();";

        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result)
        })
    })

}