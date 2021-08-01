module.exports = function (app, db, upload) {

    app.post("/studentCourses", (req, res) => {
        const studentId = req.body.id;

        const query = "SELECT * FROM course WHERE course_id IN( SELECT course_id FROM enroll WHERE student_id=?);";

        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/studentCourses/:id", (req, res) => {
        const courseId = req.params.id;
        const query = "SELECT course.course_id,course.teacher_id, course.course_name, course.year, course.description, lesson.lesson_id, lesson.topic, content.content_id, content.content_name, content.content, user.fname, user.lname FROM (((course INNER JOIN user ON course.teacher_id = user.user_id )RIGHT JOIN lesson ON course.course_id = lesson.course_id) LEFT JOIN content ON lesson.lesson_id = content.lesson_id) WHERE course.course_id=?;";

        db.query(query, courseId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

};