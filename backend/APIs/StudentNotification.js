module.exports = function (app, db, upload) {

    app.post("/StudentNotification", (req, res) => {
        const studentId = req.body.id;

        //  const query = "SELECT * FROM course WHERE course_id IN( SELECT course_id FROM enroll WHERE student_id=?);";
        
        const query = "SELECT p1.payment_id, p1.month, p1.course_id from payment p1 INNER JOIN (SELECT MAX(payment_id) AS maxid, month, course_id FROM payment WHERE (course_id IN (SELECT course_id FROM enroll WHERE student_id=?)) AND student_id=? GROUP BY course_id) p2 ON p1.payment_id = p2.maxid AND p1.course_id = p2.course_id;";
        
        db.query(query, [studentId, studentId], (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json(result)
        })
    })

};
        
        
