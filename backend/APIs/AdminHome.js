module.exports = function (app, db) {

    app.get("/adminHome/pendingReceipts", (req, res) => {

        const query = "SELECT COUNT(payment_id) AS pendingReceipts FROM payment WHERE verified=0;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].pendingReceipts)
        })
    })

    app.get("/adminHome/verifiedReceipts", (req, res) => {

        const query = "SELECT COUNT(payment_id) AS verifiedReceipts FROM payment WHERE verified=1;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].verifiedReceipts)
        })
    })

    app.get("/adminHome/rejectedReceipts", (req, res) => {

        const query = "SELECT COUNT(payment_id) AS rejectedReceipts FROM payment WHERE verified=2;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].rejectedReceipts)
        })
    })
    
    app.get("/adminHome/unenrolledCourses", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT COUNT(course_id) AS unenrolled from course WHERE course_id NOT IN (SELECT course_id FROM enroll);";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].unenrolled)
        })
    })

    app.get("/adminHome/totalStudents", (req, res) => {

        const query = "SELECT COUNT(student_id) AS studentCount from student;";

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result[0].studentCount)
        })
    })

}