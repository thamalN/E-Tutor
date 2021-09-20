const { validateToken } = require('./JWT')
module.exports = function (app, db) {

    app.get("/adminHome/pendingReceipts", validateToken, (req, res) => {

        const query = "SELECT COUNT(payment_id) AS pendingReceipts FROM payment WHERE verified=0;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].pendingReceipts)
        })
    })

    app.get("/adminHome/verifiedReceipts", validateToken, (req, res) => {

        const query = "SELECT COUNT(payment_id) AS verifiedReceipts FROM payment WHERE verified=1;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].verifiedReceipts)
        })
    })

    app.get("/adminHome/rejectedReceipts", validateToken, (req, res) => {

        const query = "SELECT COUNT(payment_id) AS rejectedReceipts FROM payment WHERE verified=2;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].rejectedReceipts)
        })
    })
    
    app.get("/adminHome/unenrolledCourses", validateToken, (req, res) => {

        const query = "SELECT COUNT(course_id) AS unenrolled from course WHERE course_id NOT IN (SELECT course_id FROM enroll);";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].unenrolled)
        })
    })

    app.get("/adminHome/totalStudents", validateToken, (req, res) => {

        const query = "SELECT COUNT(student_id) AS studentCount from student;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].studentCount)
        })
    })

    app.get("/adminHome/unassignedTeachers", validateToken, (req, res) => {

        const query = "SELECT COUNT(teacher_id) AS unassignedTeachers from teacher WHERE teacher_id NOT IN (SELECT teacher_id FROM course);";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].unassignedTeachers)
        })
    })

}