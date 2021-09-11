module.exports = function (app, db) {

    app.post("/teacherHome/courses", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT COUNT(course_id) AS courses FROM course WHERE teacher_id=?;";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].courses)
        })
    })

    app.post("/teacherHome/students", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT COUNT(*) AS students from enroll WHERE course_id IN (SELECT course_id FROM course WHERE teacher_id=?);";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].students)
        })
    })

}