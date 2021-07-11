module.exports = function (app, db) {
    app.post("/teacherCourses", (req, res) => {
        const teacherId = req.body.id;
    
     const query = "SELECT * FROM course WHERE teacher_id=?;";
    
        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })
};