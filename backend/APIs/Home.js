module.exports = function (app, db) {

    app.get("/home/teachers", (req, res) => {
        const query = "SELECT COUNT(teacher_id) AS teachers from teacher;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result[0].teachers)
        })
    })

    app.get("/home/students", (req, res) => {
        const query = "SELECT COUNT(student_id) AS students from student;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result[0].students)
        })
    })

    app.get("/home/courses", (req, res) => {
        const query = "SELECT COUNT(course_id) AS courses from course;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result[0].courses)
        })
    })

    app.get("/home/lessons", (req, res) => {
        const query = "SELECT COUNT(lesson_id) AS lessons from lesson;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result[0].lessons)
        })
    })

    
};
