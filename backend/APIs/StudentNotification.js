module.exports = function (app, db, upload) {

    app.post("/StudentNotification", (req, res) => {
        const studentId = req.body.id;

        const query = "SELECT * FROM course WHERE course_id IN( SELECT course_id FROM enroll WHERE student_id=?);";

        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result)
        })
    })

};
        // const query = "SELECT * FROM course WHERE course_id IN ( SELECT course_id FROM enroll WHERE student_id = ?);";
        
