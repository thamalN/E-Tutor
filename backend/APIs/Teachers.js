module.exports = function (app, db) {
    app.get("/getAllTeachers", (req, res) =>{

        const query = "SELECT teacher.teacher_id, user.fname, user.lname FROM teacher INNER JOIN user ON teacher.teacher_id=user.user_id";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })
};